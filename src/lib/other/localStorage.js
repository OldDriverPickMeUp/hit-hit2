export function getLocalStorage(key, defaultValue, changeFormat, check) {
  const value = window.localStorage.getItem(key);
  if (check) {
    if (!check(value)) {
      return defaultValue;
    }
    return value;
  }
  if (value === undefined || value === null) return defaultValue;
  return changeFormat(value);
}

export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

export function getJsonLocalStorage(key, defaultValue) {
  const value = window.localStorage.getItem(key);
  if (value === undefined || value === null) {
    setJsonLocalStorage(key, defaultValue);
    return defaultValue;
  }
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error(e);
    setJsonLocalStorage(key, defaultValue);
    return defaultValue;
  }
}

export function setJsonLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
