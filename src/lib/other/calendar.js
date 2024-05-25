const DAY_INDEX = [0, 1, 2, 3, 4, 5, 6];

export function getCalendarData(year, monthIndex) {
  const firstDay = new Date(year, monthIndex, 1);
  const firstDayIndex = firstDay.getDay();
  const toSubtractDays = DAY_INDEX.indexOf(firstDayIndex);
  firstDay.setDate(firstDay.getDate() - toSubtractDays);
  let ret = [];
  let count = 0;
  while (true) {
    ret.push(dateToDataDate(firstDay));
    firstDay.setDate(firstDay.getDate() + 1);
    if (firstDay.getFullYear() > year && firstDay.getDay() === 0) {
      break;
    }
    if (firstDay.getMonth() > monthIndex && firstDay.getDay() === 0) {
      break;
    }
    count += 1;
    if (count > 100) {
      console.error(firstDay.getYear(), firstDay);
      break;
    }
  }
  return ret;
}

function dateToDataDate(firstDay) {
  return {
    year: firstDay.getFullYear(),
    monthIndex: firstDay.getMonth(),
    date: firstDay.getDate(),
    dayIndex: firstDay.getDay()
  };
}

export function getHistoryReferenceValue(maxValue) {
  const hours = maxValue / 3600;
  const ceil = Math.ceil(hours);
  if (hours > 6) {
    return 8;
  }
  if (hours > 3) {
    return ceil + 1;
  }
  return ceil;
}

export function getPastDays(count) {
  const tmp = new Date();
  let dates = [];
  for (let i = 0; i < count; ++i) {
    tmp.setDate(tmp.getDate() - 1);
    dates.push(dateToDataDate(tmp));
  }
  return dates;
}

export function toNewDate(date) {
  return new Date(date.year, date.monthIndex, date.date);
}