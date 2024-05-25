import React, { useRef, useCallback, useState } from "react";
import MetronomeView from "./metronomeView";
import useTune from "../../lib/hook/tune/tune";
import { handleFreqChange } from "./tunerIndicator";
// import { drawCanvas } from "../../lib/record/recordManager";
// import TunerProps from "./tunnerProps";

function MainPanel({ play, stop, playing, counted }) {
  const canvasRef = useRef();  //eslint-disable-line
  const drawCb = useCallback((targetNode, [freq, data]) => {
    handleFreqChange(targetNode, freq);
    // if (canvasRef.current) {
    //   drawCanvas(canvasRef.current, data);
    // }
  }, []);
  const [tunerProps, setTunerProps] = useState(); //eslint-disable-line
  const tuneData = useTune(drawCb, tunerProps);

  return (
    <div className="bg-gray-200">
      <MetronomeView
        play={play}
        playing={playing}
        stop={stop}
        counted={counted}
        tuneData={tuneData}
      />
      {/* <TunerProps props={tunerProps} setProps={setTunerProps}></TunerProps> */}
      {/* <canvas ref={canvasRef} width="500" height="300"></canvas> */}
    </div>
  );
}

export default MainPanel;
