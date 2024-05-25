import React, { useRef, useEffect } from "react";
import SvgCircle from "../../assets/icons/Circle";
import { enableNoSleep } from "../../lib/other/noSleep";
import { Subject } from "rxjs";

function PlayButton({ playing, play, stop }) {
  const subjectRef = useRef();
  useEffect(() => {
    subjectRef.current = new Subject();
    return () => (subjectRef.current = null);
  }, []);
  const onClick = () => {
    if (playing) {
      subjectRef.current.next("stop");
      // refStopPromRef.current && refStopPromRef.current.resolve();
      stop();
      // disableNoSleep();
      return;
    }
    play();
    const stopProm = new Promise((resolve, reject) => {
      const subscription = subjectRef.current.subscribe({
        next: value => {
          if (value === "stop") {
            resolve();
            subscription.unsubscribe();
          }
        }
      });
    });
    enableNoSleep(stopProm);
  };
  return (
    <button className="relative inline-block focus:outline-none" onClick={onClick}>
      <div>
        <SvgCircle />
      </div>
      <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
        <span
          className="text-color-main text-4xl leading-none"
          // onClick={onClick}
        >
          {playing ? "Pause" : "Go"}
        </span>
      </div>
    </button>
  );
}

export default PlayButton;
