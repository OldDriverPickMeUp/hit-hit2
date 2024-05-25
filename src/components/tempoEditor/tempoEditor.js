import React from "react";
import "../../styles/tailwind.css";
import Slider from "./slider";
import EditableNumber from "./editableNumber";
import usePress from "../../lib/hook/usePress";

function PressButton({ children, onPress }) {
  const [
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onTouchCancel,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    targetRef,
  ] = usePress(onPress);
  return (
    <button
      ref={targetRef}
      className="cursor-pointer text-2xl p-2 select-none focus:outline-none"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
    >
      {children}
    </button>
  );
}

function TempoEditor({
  speed,
  increaseSpeed,
  decreaseSpeed,
  increaseSpeedByTen,
  decreaseSpeedByTen,
  setSpeed,
}) {
  return (
    <div className="w-full">
      <div className="flex leading-none text-center items-center mb-4 text-gray-600">
        <div className="flex-1">
          <PressButton onPress={decreaseSpeedByTen}>
            -10
          </PressButton>
        </div>
        <div className="flex-1">
          <PressButton onPress={decreaseSpeed}>-1</PressButton>
        </div>
        <div className="flex-1 text-3xl sm:text-4xl text-gray-600">
          <EditableNumber number={speed} onChange={setSpeed} />
        </div>
        <div className="flex-1">
          <PressButton onPress={increaseSpeed}>+1</PressButton>
        </div>
        <div className="flex-1">
          <PressButton onPress={increaseSpeedByTen}>+10</PressButton>
        </div>
      </div>
      <div>
        <Slider value={speed} onChange={setSpeed} />
      </div>
    </div>
  );
}

export default TempoEditor;
