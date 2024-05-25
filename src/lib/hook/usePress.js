import { useEffect, useRef } from "react";
import Press from "../intereact/press";

function usePress(onPress) {
  const pressObjRef = useRef({});
  const targetRef = useRef();
  useEffect(() => {
    const press = new Press();
    press.targetRef = targetRef;
    pressObjRef.current = press;
    return () => {
      press.unsubscribe();
    };
  }, []);

  useEffect(() => {
    pressObjRef.current.onPress = onPress;
  }, [onPress]);
  const press = pressObjRef.current;
  const {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
  } = press;
  return [
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    targetRef,
  ];
}

export default usePress;
