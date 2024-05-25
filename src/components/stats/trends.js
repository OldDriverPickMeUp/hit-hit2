import React from "react";
import { parseTimePeriod } from "../../lib/stats/timeFormattor";
import { MoreThanZero } from "../mainPanel/timePeriodView";
import arrow from "../../assets/icons/arrow.svg";

function VarianceView({ hour, minute }) {
  return (
    <div>
      <MoreThanZero value={hour}>
        <span className="mr-1">{hour}h</span>
      </MoreThanZero>
      <MoreThanZero value={minute}>
        <span className="mr-1">{minute}m</span>
      </MoreThanZero>
    </div>
  );
}
function Trends({ yesterday }) {
  const eq = Math.abs(yesterday) < 10;
  const increase = yesterday > 0;
  return (
    <div className="text-gray-500 flex">
      <div>Yesterday</div>
      <div className="flex items-center">
        <img src={arrow} className="h-3"></img>
      </div>
      <VarianceView {...parseTimePeriod(Math.abs(yesterday))} />
    </div>
  );
}

export default Trends;
