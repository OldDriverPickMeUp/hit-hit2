import React from "react";
import BasicStats from "./basic";
import PastDays from "./pastDays";

function Stats({ todayUsage, historyData, historyTime, trends }) {
  return (
    <div>
      <BasicStats todayUsage={todayUsage} historyTime={historyTime} />
      <PastDays historyData={historyData} trends={trends} />
    </div>
  );
}

export default Stats;
