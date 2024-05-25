import React from "react";
import HistoryStats from "./historyStats";
import { Link } from "react-router-dom";
import { getPastDays } from "../../lib/other/calendar";
import { useTranslation } from "react-i18next";

function PastDays({ historyData, trends }) {
  const { t } = useTranslation();
  const showHistoryData = historyData.slice(0, 7);
  const showDates = getPastDays(7);

  return (
    <div className="bg-gray-200 p-2">
      <div className="mb-3">
        <span className="text-gray-700">{t("stat:past7")}</span>
      </div>
      {/* <Trends yesterday={trends.yesterday} /> */}
      <HistoryStats historyData={showHistoryData} showDates={showDates} />
      <div className="text-gray-700 text-xs text-right mt-2">
        <Link to="/dashboard">
          <span className="text-1xl cursor-pointer hover:text-gray-400">
            {t("metronome:more")}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default PastDays;
