import React from "react";
import Workload from "./workload";
import usePopup from "../../lib/hook/utils/selector/popup";
import anime from "animejs";
import { getHistoryReferenceValue, toNewDate } from "../../lib/other/calendar";
import { dateEquals } from "../../lib/other/dateOperation";
import { getTimeDecimal } from "./todayUsagePeriodView";

function formatDate(date) {
  return date.toLocaleString("default", {
    // year: "numeric",
    month: "long",
    day: "numeric"
  });
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

function DetailPeriodView({ usage }) {
  return (
    <div>
      <span className="mr-1">
        {getTimeDecimal(usage, 60, 1)} min{usage > 60 * 2 && "s"}
      </span>
    </div>
  );
}

function HistoryBlock({ date, value, dataRef = 3600 }) {
  const { popupRef, togglePopup, open } = usePopup(onPopupOpen, onPopupClose);
  return (
    <div
      tabIndex="-1"
      className="focus:outline-none mb-2 cursor-pointer"
      onBlur={() => open && togglePopup()}
      onClick={togglePopup}
    >
      <Workload data={value} dataRef={dataRef} />
      <div
        className="opacity-0 overflow-hidden h-0 text-gray-600"
        ref={popupRef}
      >
        <div className="mr-1">{formatDate(date)}:</div>
        <DetailPeriodView usage={value} />
      </div>
    </div>
  );
}

function HistoryStats({ historyData, showDates }) {
  const maxValue =
    historyData.length > 0
      ? Math.max(...historyData.map(({ value }) => value))
      : 1;
  const dataRef = getHistoryReferenceValue(maxValue) * 3600;
  return (
    <div className="text-1xl">
      {showDates.map(eachDate => {
        const findHistory = historyData.find(({ date }) =>
          dateEquals(toNewDate(eachDate), date)
        );
        const historyValue = findHistory ? findHistory.value : 0;
        return (
          <HistoryBlock
            key={dataDateToKey(eachDate)}
            date={toNewDate(eachDate)}
            value={historyValue}
            dataRef={dataRef}
          />
        );
      })}
    </div>
  );
}

export default HistoryStats;

function dataDateToKey({ year, monthIndex, date }) {
  return `${year}-${monthIndex}-${date}`;
}
