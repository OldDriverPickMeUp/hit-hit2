import { useState, useCallback } from "react";
import { getCalendarData } from "../other/calendar";

function dateToState(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    date: dateObj.getDate()
  };
}
function stateToDate(state) {
  const { year, month, date } = state;
  return new Date(year, month, date);
}

function getHasNext(currentDate) {
  const nowDate = new Date();
  if (currentDate.year > nowDate.getFullYear()) return false;
  if (currentDate.year === nowDate.getFullYear()) {
    if (currentDate.month >= nowDate.getMonth()) return false;
  }
  return true;
}

function getNextMonthStr(monthDate) {
  const nextMonth = stateToDate(monthDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return nextMonth.toLocaleString("default", {
    month: "long"
  });
}

function getPrevMonthStr(monthDate) {
  const prevMonth = stateToDate(monthDate);
  prevMonth.setMonth(prevMonth.getMonth() - 1);
  return prevMonth.toLocaleString("default", {
    month: "long"
  });
}

function useMonthSelect() {
  const [currentDate, setCurrentDate] = useState(() => dateToState(new Date()));
  const next = useCallback(() => {
    setCurrentDate(state => {
      const date = stateToDate(state);
      date.setMonth(date.getMonth() + 1);
      return dateToState(date);
    });
  }, []);

  const prev = useCallback(() => {
    setCurrentDate(state => {
      const date = stateToDate(state);
      date.setMonth(date.getMonth() - 1);
      return dateToState(date);
    });
  }, []);
  return {
    prev,
    prevMonth: getPrevMonthStr(currentDate),
    next,
    nextMonth: getNextMonthStr(currentDate),
    dates: getCalendarData(currentDate.year, currentDate.month),
    currentMonthName: stateToDate(currentDate).toLocaleString("default", {
      month: "long",
      year: "numeric"
    }),
    hasNext: getHasNext(currentDate),
    currentDate
  };
}

export default useMonthSelect;
