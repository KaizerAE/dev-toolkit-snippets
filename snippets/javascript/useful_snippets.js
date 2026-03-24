// ============================================================
// JavaScript Useful Snippets for Developers
// ============================================================


// ---- Array Utilities ----

/** Remove duplicates from array */
const unique = arr => [...new Set(arr)];

/** Flatten one-level nested array */
const flatten = arr => arr.flat();

/** Chunk array into groups of N */
const chunk = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) =>
    arr.slice(i * n, i * n + n)
  );

/** Group array by key */
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});

/** Shuffle array (Fisher-Yates) */
const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Pick random item from array */
const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];

/** Intersection of two arrays */
const intersection = (a, b) => a.filter(x => b.includes(x));

/** Difference of two arrays (a - b) */
const difference = (a, b) => a.filter(x => !b.includes(x));


// ---- Object Utilities ----

/** Deep clone an object */
const deepClone = obj => JSON.parse(JSON.stringify(obj));

/** Pick specific keys from object */
const pick = (obj, keys) =>
  keys.reduce((acc, k) => (k in obj ? { ...acc, [k]: obj[k] } : acc), {});

/** Omit specific keys from object */
const omit = (obj, keys) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

/** Merge objects deeply */
const deepMerge = (target, source) => {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  return Object.assign(target || {}, source);
};

/** Flatten nested object with dot notation keys */
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});


// ---- Function Utilities ----

/** Debounce: delay execution until after wait ms */
const debounce = (fn, wait) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
};

/** Throttle: allow execution at most once per limit ms */
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

/** Memoize a function */
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

/** Compose functions right to left */
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

/** Pipe functions left to right */
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

/** Sleep / delay for async code */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Retry async function on failure */
const retry = async (fn, times = 3, delay = 1000) => {
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === times - 1) throw err;
      await sleep(delay);
    }
  }
};

/** Fetch with timeout */
async function fetchWithTimeout(url, ms = 5000, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}


// ---- String Utilities ----

/** Capitalize first letter */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/** Convert camelCase to kebab-case */
const camelToKebab = str =>
  str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

/** Truncate string with ellipsis */
const truncate = (str, max = 100) =>
  str.length > max ? str.slice(0, max - 3) + '...' : str;

/** Generate a random alphanumeric ID */
const randomId = (len = 8) =>
  Math.random().toString(36).substring(2, 2 + len);

/** Count word occurrences in a string */
const countWords = str =>
  str.trim().split(/\s+/).reduce((acc, w) => {
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});


// ---- DOM Utilities ----

/** Wait for an element to appear in the DOM */
const waitForElement = (selector, timeout = 5000) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(selector)) return resolve(document.querySelector(selector));
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) { observer.disconnect(); resolve(el); }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => { observer.disconnect(); reject(new Error('Timeout')); }, timeout);
  });

/** Copy text to clipboard */
const copyToClipboard = text => navigator.clipboard.writeText(text);

/** Get all query params as an object */
const getQueryParams = (url = window.location.href) =>
  Object.fromEntries(new URL(url).searchParams);


// Export for Node.js / module environments
if (typeof module !== 'undefined') {
  module.exports = {
    unique, flatten, chunk, groupBy, shuffle, randomItem,
    intersection, difference, deepClone, pick, omit,
    debounce, throttle, memoize, compose, pipe,
    sleep, retry, fetchWithTimeout,
    capitalize, camelToKebab, truncate, randomId, countWords
  };
}
