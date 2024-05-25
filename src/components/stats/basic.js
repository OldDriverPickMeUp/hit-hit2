import React from "react";
import TodayUsagePeriodView from "./todayUsagePeriodView";
import { useTranslation } from "react-i18next";

export function formatTotalTime(totalTime) {
  const hours = totalTime / 3600;
  if (hours < 10) {
    return Math.round(hours * 10) / 10;
  }
  return Math.round(hours);
}

export function DashCard({ title, children }) {
  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <div className="absolute top-0 left-0 p-2">
        <span className="text-gray-700">{title}</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export function TotalHoursCard({ totalTime }) {
  const { t } = useTranslation();
  return (
    <DashCard title={t("stat:hours")}>
      <span className="text-3xl sm:text-4xl text-gray-600">
        {formatTotalTime(totalTime)}
      </span>
    </DashCard>
  );
}

function BasicStats({ todayUsage, historyTime }) {
  const { t } = useTranslation();

  return (
    <div className="flex sm:block sm:w-max-w-6xl flex-wrap">
      <div className="mb-2 bg-gray-200  mr-3 sm:mr-0">
        <TotalHoursCard totalTime={todayUsage + historyTime} />
      </div>
      <div className="p-2 text-1xl sm:w-40 text-gray-600 leading-normal relative flex justify-center items-center h-40 flex-1 sm:flex-none">
        <div className="absolute top-0 left-0 p-2">
          <span className="text-gray-700">{t("stat:today")}</span>
        </div>
        <div>
          <span className="text-1xl sm:text-2xl text-gray-600">
            <TodayUsagePeriodView todayUsage={todayUsage} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default BasicStats;
