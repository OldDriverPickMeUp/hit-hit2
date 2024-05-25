import { useRef, useEffect, useCallback, useState } from "react";

function usePopup(onOpen, onClose) {
  const [on, setOn] = useState();
  const popupRef = useRef();
  useEffect(() => {
    const currentNode = popupRef.current;
    if (currentNode) {
      if (on) {
        onOpen(currentNode);
      } else {
        onClose(currentNode);
      }
    }
  }, [on, onOpen, onClose]);
  const togglePopup = useCallback(() => {
    setOn(on => !on);
  }, []);
  return { popupRef, togglePopup, open: on };
}

export default usePopup;

export function usePopupWithExternalState(state, onOpen, onClose) {
  const popupRef = useRef();
  useEffect(() => {
    const currentNode = popupRef.current;
    if (currentNode) {
      if (state) {
        onOpen(currentNode);
      } else {
        onClose(currentNode);
      }
    }
  }, [state, onOpen, onClose]);
  return { popupRef };
}

export function useWrapWithRef(onOpen, onClose) {
  const nodeRef = useRef();
  const onOpenForRef = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    onOpen && onOpen(node);
  }, [nodeRef, onOpen]);
  const onCloseForRef = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return;
    onClose && onClose(node);
  }, [nodeRef, onClose]);
  return [nodeRef, onOpenForRef, onCloseForRef];
}
