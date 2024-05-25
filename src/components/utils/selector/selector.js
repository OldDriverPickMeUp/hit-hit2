import React from "react";
import usePopup from "../../../lib/hook/utils/selector/popup";
import anime from "animejs";

function DefaultValueRender({ value }) {
  return <span>{value}</span>;
}

function onPopupOpen(targetNode) {
  anime({
    targets: targetNode,
    translateX: "-100%",
    opacity: 1,
    duration: 800
  });
}

function onPopupClose(targetNode) {
  anime({
    targets: targetNode,
    translateX: "0%",
    opacity: 0,
    duration: 800
  });
}

function Selector({
  value,
  allowValues,
  onChange,
  ValueComponent = DefaultValueRender
}) {
  const { popupRef, togglePopup, open } = usePopup(onPopupOpen, onPopupClose);
  const allowForSelection = allowValues.filter(each => each !== value);
  return (
    <div
      className="relative focus:outline-none"
      tabIndex="-1"
      onBlur={() => open && togglePopup()}
    >
      <div className="cursor-pointer relative z-10" onClick={togglePopup}>
        <ValueComponent value={value} selected={true} />
      </div>
      <div className="absolute top-0 left-0 z-0 flex opacity-0" ref={popupRef}>
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
export default Selector;
