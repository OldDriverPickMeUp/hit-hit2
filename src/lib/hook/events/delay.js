import { useRef, useEffect, useState } from "react";
import { Subject } from "rxjs";
import { delay } from "rxjs/operators";

function useDelay(signal, delayTime) {
  const [delayedSignal, setDelayedSingal] = useState(signal);
  const subjectRef = useRef();
  useEffect(() => {
    const subject = new Subject();
    const subscribtion = subject
      .pipe(delay(delayTime))
      .subscribe({ next: v => setDelayedSingal(v) });
    subjectRef.current = subject;
    return () => {
      subscribtion.unsubscribe();
      subjectRef.current = null;
    };
  }, [delayTime]);

  useEffect(() => {
    const subject = subjectRef.current;
    if (subject) {
      subject.next(signal);
    }
  }, [signal]);
  return delayedSignal;
}

export default useDelay;
