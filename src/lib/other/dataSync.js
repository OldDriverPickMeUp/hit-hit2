export function getAllLocalStorage() {
  const length = window.localStorage.length;
  let data = {};
  for (let i = 0; i < length; ++i) {
    const keyName = window.localStorage.key(i);
    const keyValue = window.localStorage.getItem(keyName);
    data[keyName] = keyValue;
  }
  return data;
}

export function restoreAllLocalStorage(data) {
  for (let keyName of Object.keys(data)) {
    const keyValue = data[keyName];
    window.localStorage.setItem(keyName, keyValue);
  }
}
