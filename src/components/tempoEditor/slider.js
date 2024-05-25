import React from "react";
import css from "./slider.module.css";

function Slider({ onChange, value }) {
  return (
    <div className={`${css.slider}`}>
      <input
        className="appearance-none w-full"
        type="range"
        value={value}
        min={20}
        max={300}
        step={1}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

export default Slider;
