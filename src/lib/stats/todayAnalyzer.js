import { dateEquals } from "../other/dateOperation";
import { Subject } from "rxjs";
import { bufferTime, filter } from "rxjs/operators";
import HistoryStorage from "./historyStorage";
import {
  getJsonLocalStorage,
  setJsonLocalStorage
} from "../other/localStorage";

function getHistoryStats(historyData) {
  const nowDate = new Date();
  if (historyData.length === 0) {
    return {
      startDate: nowDate,
      totalDays: 1,
      avgTime: 0,
      maxValue: 0,
      maxDate: nowDate,
      totalTime: 0
    };
  }
  const startDate = historyData[historyData.length - 1].date;
  let maxValue = 0;
  let totalDays = 1;
  let totalTime = 0;
  let maxDate = nowDate;
  historyData.forEach(({ date, value }) => {
    if (value > maxValue) {
      maxValue = value;
      maxDate = date;
    }
    if (value > 1) {
      totalDays += 1;
    }
    totalTime += value;
  });
  const avgTime = totalTime / totalDays;
  return {
    startDate,
    maxValue,
    maxDate,
    totalTime,
    totalDays,
    avgTime
  };
}

function getTrends(historyStorage) {
  const start = new Date();
  start.setDate(start.getDate() - 1);
  const historyYesterday = historyStorage.getByIndex(-1);
  if (!historyYesterday) {
    return {
      yesterday: 0
    };
  }
  const yesterday = dateEquals(start, historyYesterday.date)
    ? historyYesterday.value
    : 0;
  const historyTwoDays = historyStorage.getByIndex(-2);
  if (!historyTwoDays) {
    return {
      yesterday: 0
    };
  }
  start.setDate(start.getDate() - 1);
  const theDayBefore = dateEquals(start, historyTwoDays.date)
    ? historyTwoDays.value
    : 0;
  return {
    yesterday: yesterday - theDayBefore || 0
  };
}

class TodayAnalyzer {
  constructor() {
    this._historyStorage = new HistoryStorage();
    this._initialize();
    this._subject = this._createSubject();
    this.onHistoryDataChange = null;
  }

  _initialize() {
    const currentDate = new Date();
    this._currentDate = new Date(getJsonLocalStorage("todayDate", currentDate));
    this._todayUsage = getJsonLocalStorage("todayUsage", 0);
    if (dateEquals(currentDate, this._currentDate)) {
      return;
    }
    this._resetWithDate(currentDate, 0);
  }

  _resetWithDate(currentDate, initUsage) {
    if (this._currentDate) {
      this._historyStorage.put(this._currentDate, this._todayUsage);
    }
    this._currentDate = currentDate;
    this._todayUsage = initUsage;
    setJsonLocalStorage("todayDate", currentDate);
    setJsonLocalStorage("todayUsage", initUsage);
    this.onHistoryDataChange && this.onHistoryDataChange(this.historyData);
  }

  _createSubject() {
    const subject = new Subject();
    subject
      .pipe(
        bufferTime(10000),
        filter(buffer => buffer.length > 0)
      )
      .subscribe({
        next: times => {
          const time = times.reduce((total, value) => total + value, 0);
          this._add(time);
        }
      });
    return subject;
  }

  add(time) {
    this._subject.next(time);
  }

  _add = time => {
    const currentDate = new Date();
    if (dateEquals(currentDate, this._currentDate)) {
      this._todayUsage += time;
      setJsonLocalStorage("todayUsage", this._todayUsage);
      return;
    }
    this._resetWithDate(currentDate, time);
  };

  get todayUsage() {
    return this._todayUsage;
  }

  get historyData() {
    const { historyData } = this._historyStorage;
    const stats = getHistoryStats(historyData);
    return {
      data: historyData,
      stats,
      trends: getTrends(this._historyStorage)
    };
  }
}

export default TodayAnalyzer;
