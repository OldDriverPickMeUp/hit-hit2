import React from "react";
// import Selector from "../utils/selector/selector";
import WaveRenderer from "./waveRenderer";
import CollapseSelector from "../utils/selector/collapseSelector";

function WaveSelector({ waveType, setWaveType }) {
  return (
    <div>
      <CollapseSelector
        value={waveType}
        allowValues={["sine", "triangle", "square", "sawtooth"]}
        onChange={setWaveType}
        ValueComponent={WaveRenderer}
      />
    </div>
  );
}

export default WaveSelector;
