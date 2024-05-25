import React from "react";
import useMonthSelect from "../../../lib/hook/monthSelect";
import CalendarCard from "./calendarCard";
import { dateEquals } from "../../../lib/other/dateOperation";
import { Transition, TransitionGroup } from "react-transition-group";
import { toNewDate } from "../../../lib/other/calendar";

function getValueFromHistory(historyData, date) {
  const newDate = new Date(date.year, date.monthIndex, date.date);
  const data = historyData.filter(each =>
    dateEquals(each.date, newDate)
  )[0] || { value: 0 };
  return data.value || 0;
}

function getHasPrev(currentDate, startDate) {
  if (currentDate.year < startDate.getFullYear()) return false;
  if (currentDate.year === startDate.getFullYear()) {
    if (currentDate.month <= startDate.getMonth()) return false;
  }
  return true;
}

function beforeAndEqualDate(currentDate, targetDate) {
  if (currentDate.year > targetDate.getFullYear()) return false;
  if (currentDate.year === targetDate.getFullYear()) {
    if (currentDate.monthIndex > targetDate.getMonth()) return false;
    if (currentDate.monthIndex === targetDate.getMonth()) {
      if (currentDate.date > targetDate.getDate()) return false;
    }
  }
  return true;
}

function afterAndEqualDate(currentDate, targetDate) {
  if (currentDate.year > targetDate.getFullYear()) return true;
  if (currentDate.year === targetDate.getFullYear()) {
    if (currentDate.monthIndex > targetDate.getMonth()) return true;
    if (currentDate.monthIndex === targetDate.getMonth()) {
      if (currentDate.date >= targetDate.getDate()) return true;
    }
  }
  return false;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getClassNameByState(state) {
  if (state === "entered") return "opacity-100";
  if (state === "exiting") return "hidden";
  return "opacity-0 ";
}

function CalendarLayout({
  historyData,
  todayUsage,
  startDate,
  maxDate,
  dataRef
}) {
  const {
    next,
    nextMonth,
    prev,
    prevMonth,
    dates,
    currentMonthName,
    hasNext,
    currentDate
  } = useMonthSelect();
  const todayDate = new Date();
  const allHistoryData = [
    { date: todayDate, value: todayUsage },
    ...historyData
  ];
  const hasPrev = getHasPrev(currentDate, startDate);
  return (
    <div>
      <div className="flex text-gray-400 justify-between mb-2 leading-none">
        {WEEKDAYS.map(text => (
          <div
            key={text}
            className="text-center"
            style={{ width: `calc( ${100 / 7}% - ${3 / 7}rem - 0.01px )` }}
          >
            {text}
          </div>
        ))}
      </div>
      <div>
        <TransitionGroup className="flex flex-wrap">
          {dates.map((each, index) => {
            const cardDate = toNewDate(each);
            const isToday = dateEquals(cardDate, todayDate);
            const isStartDate = dateEquals(cardDate, startDate);
            const isMaxDate = dateEquals(cardDate, maxDate);
            const inScope =
              beforeAndEqualDate(each, todayDate) &&
              afterAndEqualDate(each, startDate);
            return (
              <Transition key={cardDate.toString()} timeout={100}>
                {state => (
                  <div
                    className={`h-12 sm:h-16 ${getClassNameByState(state)}`}
                    style={{
                      // minus 0.01px for firefox
                      width: `calc( ${100 / 7}% - ${3 / 7}rem - 0.01px )`,
                      marginRight: index % 7 !== 6 ? "0.5rem" : "0",
                      marginBottom: `${3 / 7}rem`,
                      transition: "all 0.3s"
                    }}
                  >
                    <CalendarCard
                      enabled={inScope}
                      dataRef={dataRef}
                      date={each}
                      data={getValueFromHistory(allHistoryData, each)}
                      isToday={isToday}
                      isStartDate={isStartDate}
                      isMaxDate={isMaxDate}
                    />
                  </div>
                )}
              </Transition>
            );
          })}
        </TransitionGroup>
      </div>
      <div className=" text-gray-500 justify-between relative">
        {hasNext && (
          <div
            className="absolute right-0 top-0 bottom-0 cursor-pointer hover:bg-gray-200 float-right p-2 inline-block"
            onClick={next}
          >
            {nextMonth}
          </div>
        )}
        {hasPrev && (
          <div
            className="absolute left-0 top-0 bottom-0 cursor-pointer hover:bg-gray-200 float-left p-2"
            onClick={prev}
          >
            {prevMonth}
          </div>
        )}
        <div className="text-center p-2">{currentMonthName}</div>
      </div>
    </div>
  );
}

export default CalendarLayout;
