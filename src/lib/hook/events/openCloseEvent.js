import { useState, useCallback } from "react";
import { useEventHandler } from "./dispatch";

function useOpenClose(targetName) {
  const [open, setOpenState] = useState(false);
  const setOpen = useCallback(() => setOpenState(true), []);
  const setClose = useCallback(() => setOpenState(false), []);
  useEventHandler(`${targetName}-open`, setOpen);
  useEventHandler(`${targetName}-close`, setClose);
  return open;
}

export default useOpenClose;
