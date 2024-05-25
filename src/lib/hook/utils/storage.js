import { useState, useCallback, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../../other/localStorage";

function useStorage(key, defaultValue, changeFormat, check) {
  const [state, setState] = useState(defaultValue);
  useEffect(() => {
    const value = getLocalStorage(key, defaultValue, changeFormat, check);
    setState(value);
    // eslint-disable-next-line
  }, []);

  const setStorage = useCallback(valueOrFunc => {
    if (typeof valueOrFunc === "function") {
      setState(value => {
        const newValue = valueOrFunc(value);
        setLocalStorage(key, newValue);
        return newValue;
      });
      return;
    }
    setLocalStorage(key, valueOrFunc);
    setState(valueOrFunc);
    // eslint-disable-next-line
  }, []);

  return [state, setStorage];
}

export default useStorage;
