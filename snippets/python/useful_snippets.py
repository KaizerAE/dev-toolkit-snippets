# ============================================================
# Python Useful Snippets for Developers
# ============================================================

import os
import json
import time
import functools
from contextlib import contextmanager
from typing import Any, Callable, Generator, Iterable


# ---- List Utilities ----

def flatten(lst: list) -> list:
    """Flatten a one-level nested list."""
    return [x for sub in lst for x in sub]


def chunks(lst: list, n: int) -> Generator:
    """Yield successive n-sized chunks from a list."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def unique(lst: list) -> list:
    """Remove duplicates while preserving order."""
    seen = set()
    return [x for x in lst if not (x in seen or seen.add(x))]


def groupby(lst: list, key: Callable) -> dict:
    """Group list items by a key function."""
    result = {}
    for item in lst:
        k = key(item)
        result.setdefault(k, []).append(item)
    return result


# ---- Decorators ----

def retry(times: int = 3, delay: float = 1.0, exceptions=(Exception,)):
    """Retry a function on failure."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == times - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator


def memoize(func: Callable) -> Callable:
    """Simple memoization decorator."""
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper


def log_calls(func: Callable) -> Callable:
    """Log function calls with arguments."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"[CALL] {func.__name__}({args}, {kwargs})")
        result = func(*args, **kwargs)
        print(f"[RETURN] {func.__name__} -> {result}")
        return result
    return wrapper


# ---- Context Managers ----

@contextmanager
def timer(label: str = "Elapsed"):
    """Measure execution time of a block."""
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{label}: {elapsed:.4f}s")


@contextmanager
def temp_directory():
    """Create and auto-clean a temporary directory."""
    import tempfile, shutil
    tmpdir = tempfile.mkdtemp()
    try:
        yield tmpdir
    finally:
        shutil.rmtree(tmpdir)


# ---- File Utilities ----

def read_json(path: str) -> Any:
    """Read and return JSON file content."""
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def write_json(path: str, data: Any, indent: int = 2) -> None:
    """Write data to a JSON file."""
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=indent, ensure_ascii=False)


def walk_files(directory: str, extension: str = None) -> Generator:
    """Walk a directory and yield file paths, optionally filtered by extension."""
    for root, _, files in os.walk(directory):
        for file in files:
            if extension is None or file.endswith(extension):
                yield os.path.join(root, file)


# ---- String Utilities ----

def camel_to_snake(name: str) -> str:
    """Convert camelCase to snake_case."""
    import re
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()


def snake_to_camel(name: str) -> str:
    """Convert snake_case to camelCase."""
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])


def truncate(text: str, max_len: int = 100, suffix: str = '...') -> str:
    """Truncate a string to max_len characters."""
    return text if len(text) <= max_len else text[:max_len - len(suffix)] + suffix


# ---- Example Usage ----
if __name__ == '__main__':
    print(flatten([[1, 2], [3, 4], [5]]))
    print(list(chunks([1, 2, 3, 4, 5, 6, 7], 3)))
    print(unique([1, 2, 2, 3, 1, 4]))
    print(camel_to_snake('MyVariableName'))
    print(snake_to_camel('my_variable_name'))

    with timer("Test block"):
        time.sleep(0.1)
