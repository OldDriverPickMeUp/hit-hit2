import React from "react";
import TunerIndicator from "./tunerIndicator";
import usePopup from "../../lib/hook/utils/selector/popup";
import anime from "animejs";
import { useTranslation } from "react-i18next";

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

function TunerView({ startTuner, stopTuner, tuning, targetNodeRef }) {
  const { t } = useTranslation();
  const { popupRef, togglePopup } = usePopup(onPopupOpen, onPopupClose);
  const onClick = () => {
    togglePopup();
    if (tuning) {
      stopTuner();
      return;
    }
    startTuner();
  };
  return (
    <div className="overflow-hidden">
      <div className="text-gray-500 text-1xl">
        <span className="cursor-pointer" onClick={onClick}>
          {tuning ? t("metronome:stopTuning") : t("metronome:startTuning")}
        </span>
      </div>
      <div ref={popupRef} className="h-0">
        <TunerIndicator targetNodeRef={targetNodeRef} />
      </div>
    </div>
  );
}

export default TunerView;
