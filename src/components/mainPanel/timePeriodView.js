import React from "react";

export function MoreThanZero({ value, children }) {
  if (value > 0) {
    return children;
  }
  return null;
}

function TimePeriodView({ hour, minute, second }) {
  return (
    <div>
      <MoreThanZero value={hour}>
        <span className="mr-1">
          {hour}hour{hour > 1 && "s"}
        </span>
      </MoreThanZero>
      <MoreThanZero value={minute}>
        <span className="mr-1">
          {minute}min{minute > 1 && "s"}
        </span>
      </MoreThanZero>
      <span>{second}s</span>
    </div>
  );
}

export default TimePeriodView;
