# 🛠️ Dev Toolkit Snippets

> A curated collection of useful code snippets, cheatsheets, and developer tools for everyday programming tasks.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 📚 Table of Contents

- [Git Cheatsheet](#-git-cheatsheet)
- [Regex Patterns](#-regex-patterns)
- [Bash / Shell Scripts](#-bash--shell-scripts)
- [Python Snippets](#-python-snippets)
- [JavaScript Snippets](#-javascript-snippets)
- [VS Code Shortcuts](#-vs-code-shortcuts)
- [Contributing](#-contributing)

---

## 🔀 Git Cheatsheet

```bash
# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (unstage changes)
git reset --mixed HEAD~1

# Discard all local changes
git checkout -- .

# Delete a remote branch
git push origin --delete branch-name

# Rename current branch
git branch -m new-name

# Stash with a message
git stash push -m "my stash message"

# Apply a specific stash
git stash apply stash@{2}

# Show log as a graph
git log --oneline --graph --all

# Find which commit introduced a bug (binary search)
git bisect start
git bisect bad
git bisect good v1.0
```

---

## 🔍 Regex Patterns

```
# Email validation
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

# URL (http/https)
https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)

# IPv4 Address
^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$

# Strong Password (min 8 chars, upper, lower, digit, special)
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$

# Date (YYYY-MM-DD)
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$

# Hex Color
^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$
```

---

## 🐚 Bash / Shell Scripts

```bash
# Find all files larger than 100MB
find / -type f -size +100M 2>/dev/null

# Count lines in all .js files recursively
find . -name "*.js" | xargs wc -l

# Kill process on a specific port
lsof -ti :3000 | xargs kill -9

# Monitor a log file in real-time
tail -f /var/log/app.log

# Backup a directory with timestamp
tar -czf backup_$(date +%Y%m%d_%H%M%S).tar.gz /path/to/dir

# Loop through files in a directory
for f in *.txt; do
  echo "Processing $f"
done
```

---

## 🐍 Python Snippets

```python
# Flatten a nested list
flatten = lambda lst: [x for sub in lst for x in sub]

# Chunk a list into groups of N
def chunks(lst, n):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]

# Retry decorator
import time, functools
def retry(times=3, delay=1):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == times - 1:
                        raise
                    time.sleep(delay)
        return wrapper
    return decorator

# Read JSON file
import json
with open('data.json', 'r') as f:
    data = json.load(f)

# Timer context manager
import time
from contextlib import contextmanager
@contextmanager
def timer():
    start = time.perf_counter()
    yield
    print(f"Elapsed: {time.perf_counter() - start:.4f}s")
```

---

## ⚡ JavaScript Snippets

```js
// Deep clone an object
const deepClone = obj => JSON.parse(JSON.stringify(obj));

// Debounce function
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

// Throttle function
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Sleep/delay async
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Group array by key
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});

// Remove duplicates from array
const unique = arr => [...new Set(arr)];

// Fetch with timeout
async function fetchWithTimeout(url, ms = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}
```

---

## ⌨️ VS Code Shortcuts

| Action | Windows/Linux | macOS |
|--------|--------------|-------|
| Open Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Quick Open File | `Ctrl+P` | `Cmd+P` |
| Toggle Terminal | `Ctrl+`` ` | `Cmd+`` ` |
| Multi-cursor (click) | `Alt+Click` | `Option+Click` |
| Select all occurrences | `Ctrl+Shift+L` | `Cmd+Shift+L` |
| Move line up/down | `Alt+↑/↓` | `Option+↑/↓` |
| Duplicate line | `Shift+Alt+↓` | `Shift+Option+↓` |
| Go to Definition | `F12` | `F12` |
| Rename Symbol | `F2` | `F2` |
| Format Document | `Shift+Alt+F` | `Shift+Option+F` |
| Toggle Line Comment | `Ctrl+/` | `Cmd+/` |
| Zen Mode | `Ctrl+K Z` | `Cmd+K Z` |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open a PR to add:
- New language snippets
- CLI tool cheatsheets
- Useful algorithms
- Developer workflow tips

Please keep snippets concise, practical, and well-commented.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">Made with ❤️ for developers, by developers</p>
