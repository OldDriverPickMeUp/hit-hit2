import React from "react";

function TunerProps({ props, setProps }) {
  const { lowpassK = 0.1 } = props || {};

  return (
    <div>
      <input
        type="range"
        value={lowpassK}
        min={0.01}
        max={0.9999}
        step={0.0001}
        onChange={e => setProps({ lowpassK: e.target.value })}
      ></input>
    </div>
  );
}

export default TunerProps;
