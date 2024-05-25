import React from "react";
import CalendarLayout from "../components/stats/calendar/calendarLayout";
import { TotalHoursCard, DashCard } from "../components/stats/basic";
import TodayUsagePeriodView from "../components/stats/todayUsagePeriodView";
import { getHistoryReferenceValue } from "../lib/other/calendar";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function formatDate(date) {
  return date.toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function StatsTable({ startDate, maxValue, maxDate, totalDays, avgTime }) {
  const { t } = useTranslation();
  return (
    <div className="flex text-gray-600">
      <div className="mr-5">
        <div className="mb-2">
          <div>{t("stat:start")}</div>
          <div>{formatDate(startDate)}</div>
        </div>
      </div>
      <div className="mr-5">
        <div className="mb-2">
          <div>{t("stat:totalDays")}</div>
          <div>{totalDays}</div>
        </div>
        <div className="mb-2">
          <div>{t("stat:average")}</div>
          <TodayUsagePeriodView todayUsage={avgTime} />
        </div>
      </div>
      <div>
        <div className="mb-2">
          <div>{t("stat:max")}</div>
          <TodayUsagePeriodView todayUsage={maxValue} />
        </div>
        <div className="mb-2">
          <div>{t("stat:at")}</div>
          <div>{formatDate(maxDate)}</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ todayUsage, historyData }) {
  const { t } = useTranslation();
  const { data, stats } = historyData;
  const dataRef = getHistoryReferenceValue(stats.maxValue) * 3600;
  return (
    <div>
      <Helmet>
        <title>{t("dashboard:title")}</title>
        <meta
          name="description"
          content={t("dashboard:desc")}
        />
      </Helmet>
      <div className="flex mb-4 flex-wrap sm:flex-no-wrap">
        <div className="mr-5 bg-gray-200">
          <TotalHoursCard totalTime={stats.totalTime + todayUsage} />
        </div>
        <div className="sm:mr-5">
          <DashCard title={t("stat:today")}>
            <span className="text-1xl sm:text-2xl text-gray-600">
              <TodayUsagePeriodView todayUsage={todayUsage} />
            </span>
          </DashCard>
        </div>
        <div className="mt-5 sm:mt-0">
          <StatsTable {...stats} />
        </div>
      </div>
      <CalendarLayout
        historyData={data}
        todayUsage={todayUsage}
        startDate={stats.startDate}
        maxDate={stats.maxDate}
        dataRef={dataRef}
      />
    </div>
  );
}

export default Dashboard;
