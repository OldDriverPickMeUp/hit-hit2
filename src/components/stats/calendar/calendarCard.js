import React from "react";
import { formatDayUsage } from "../todayUsagePeriodView";

function getBgClass(isToday, isStartDate, isMaxDate) {
  if (isToday) return "bg-red-200";
  if (isStartDate || isMaxDate) return "bg-red-200";
  return "bg-gray-200";
}

function CalendarCard({
  enabled,
  data,
  date,
  isToday,
  isStartDate,
  isMaxDate,
  dataRef = 10800
}) {
  const showHeight = data / dataRef;
  const topData = showHeight > 1 ? "0" : `${(1 - showHeight) * 100}%`;
  const bgClass = getBgClass(isToday, isStartDate, isMaxDate);

  if (enabled) {
    return (
      <div className={`h-full w-full relative ${bgClass}`}>
        <div
          className={`absolute bottom-0 left-0 right-0 bg-color-main`}
          style={{ top: `${topData}` }}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0">
          <div className="sm:p-2 text-xs ">
            {date.date}
            {isToday ? " TODAY" : isMaxDate && " MAX"}
          </div>
          {data > 1 && !isToday && !isMaxDate && (
            <div className="text-xs sm:p-2">{formatDayUsage(data)}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full relative ${bgClass}`}>
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <div className="sm:p-2 text-xs text-gray-500">{date.date}</div>
      </div>
    </div>
  );
}

export default CalendarCard;
