import React from "react";
export function getTimeDecimal(todayUsage, base, decimalRatio = 10) {
  const hours = todayUsage / base;
  return Math.round(hours * decimalRatio) / decimalRatio;
}

function getFloorTimeDecimal(todayUsage, base, decimalRatio = 10) {
  const hours = todayUsage / base;
  return Math.floor(hours * decimalRatio) / decimalRatio;
}

export function formatDayUsage(usage) {
  if (usage > 1800) {
    const value = getTimeDecimal(usage, 3600);
    return `${value} h`;
  }
  return `${getTimeDecimal(usage, 60, 1)} m`;
}

function TodayUsagePeriodView({ todayUsage }) {
  if (todayUsage > 3600) {
    const hours = getFloorTimeDecimal(todayUsage, 3600, 1);
    const mins = getFloorTimeDecimal(todayUsage - hours * 3600, 60, 1);
    return (
      <div>
        <span className="mr-1">
          {hours}h{mins}m
        </span>
      </div>
    );
  }
  return (
    <div>
      <span className="mr-1">{getFloorTimeDecimal(todayUsage, 60, 1)}m</span>
    </div>
  );
}

export default TodayUsagePeriodView;
