import { useState, useCallback } from "react";

function useShowCollapse(initShow = false) {
  const [show, setShow] = useState(initShow);
  const toggleShow = useCallback(() => {
    setShow(show => !show);
  }, []);
  return { show, toggleShow };
}

export default useShowCollapse;
