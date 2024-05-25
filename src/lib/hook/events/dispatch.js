import { useCallback, useEffect } from "react";
import EventManager from "../../event/eventManager";

export function useDispatchEvent() {
  const dispatch = useCallback(event => {
    EventManager.instance.dispatch(event);
  }, []);
  return dispatch;
}

export function useEventHandler(eventType, handler) {
  useEffect(() => {
    const subscription = EventManager.instance.subscribe(eventType, handler);
    return () => {
      subscription.unsubscribe();
    };
  }, [eventType, handler]);
}
