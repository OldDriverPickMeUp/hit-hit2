import React from "react";
import usePopup from "../../../lib/hook/utils/selector/popup";
import anime from "animejs";

function DefaultValueRender({ value }) {
  return <span>{value}</span>;
}

function onPopupOpen(targetNode) {
  anime({
    targets: targetNode,
    height: targetNode.scrollHeight,
    opacity: 1,
    duration: 400,
    easing: "easeInOutSine"
  });
}

function onPopupClose(targetNode) {
  anime({
    targets: targetNode,
    height: "0px",
    opacity: 0,
    duration: 400,
    easing: "easeInOutSine"
  });
}

function CollapseSelector({
  value,
  allowValues,
  onChange,
  ValueComponent = DefaultValueRender
}) {
  const { popupRef, togglePopup, open } = usePopup(onPopupOpen, onPopupClose);
  const allowForSelection = allowValues.filter(each => each !== value);
  return (
    <div
      className="focus:outline-none w-full"
      tabIndex="-1"
      onBlur={() => open && togglePopup()}
    >
      <div className="cursor-pointer" onMouseDown={togglePopup}>
        <ValueComponent value={value} selected={true} />
      </div>
      <div className="opacity-0 overflow-hidden h-0" ref={popupRef}>
        {allowForSelection.map(each => (
          <div
            key={each}
            onClick={() => {
              if (!open) return;
              onChange(each);
              togglePopup();
            }}
            className="cursor-pointer inline"
          >
            <ValueComponent value={each} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default CollapseSelector;
