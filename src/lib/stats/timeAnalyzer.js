import TimeAccumulator from "./timeAccumulator";
import TodayAnalyzer from "./todayAnalyzer";

class TimeAnalyzer {
  constructor() {
    this._accumulator = new TimeAccumulator();
    this._todayAnalyzer = new TodayAnalyzer();
  }

  feed() {
    const timePeriod = this._accumulator.feed();
    this._todayAnalyzer.add(timePeriod);
  }
  stop() {
    this._accumulator.stop();
  }

  set onHistoryChange(callback) {
    this._todayAnalyzer.onHistoryDataChange = callback;
  }

  get accumulated() {
    return this._accumulator.accumulated;
  }

  get todayUsage() {
    return this._todayAnalyzer.todayUsage;
  }

  get historyData() {
    return this._todayAnalyzer.historyData;
  }

}

export default TimeAnalyzer;
