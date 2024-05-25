import {
  getJsonLocalStorage,
  setJsonLocalStorage,
} from "../other/localStorage";
import { dateEquals } from "../other/dateOperation";

class HistoryStorage {
  constructor(maxSlot = 365 * 4) {
    this._maxSlots = maxSlot;
    this._initialize();
  }

  _initialize() {
    this._startSlotIndex = getJsonLocalStorage("startSlot", 0);
    this._historySlots = getJsonLocalStorage("historySlots", []);
    this._historySlots = this._historySlots.map((each) => new Date(each));
    this._slotData = this._historySlots.map((_, i) =>
      getJsonLocalStorage(`historySlot-${i}`, 0)
    );
  }

  _pushToHistory(date, value) {
    this._historySlots.push(date);
    this._slotData.push(value);
    setJsonLocalStorage("historySlots", this._historySlots);
    const slotIndex = this._historySlots.length - 1;
    setJsonLocalStorage(`historySlot-${slotIndex}`, value);
    this._startSlotIndex = slotIndex + 1;
    setJsonLocalStorage("startSlot", this._startSlotIndex);
  }

  _setToHistory(slotIndex, value) {
    this._slotData[slotIndex] = value;
    setJsonLocalStorage(`historySlot-${slotIndex}`, value);
  }

  _replaceToHistory(date, value) {
    this._historySlots[this._startSlotIndex] = date;
    setJsonLocalStorage("historySlots", this._historySlots);
    setJsonLocalStorage(`historySlot-${this._startSlotIndex}`, value);
    this._startSlotIndex += 1;
    setJsonLocalStorage("startSlot", this._startSlotIndex);
  }

  put(date, value) {
    const existIndex = this._historySlots.findIndex((each) =>
      dateEquals(each, date)
    );
    if (existIndex !== -1) {
      this._setToHistory(existIndex, value);
      return;
    }
    this._addSlotData(date, value);
  }

  _addSlotData(date, value) {
    if (this._historySlots.length >= this._maxSlots) {
      this._replaceOldestSlot(date, value);
      return;
    }
    this._pushToHistory(date, value);
  }

  _replaceOldestSlot(date, value) {
    if (this._startSlotIndex >= this._maxSlots) {
      this._startSlotIndex = 0;
    }
    this._replaceToHistory(date, value);
  }

  get historyData() {
    let historyTimeData = [];
    const totalLength = this._historySlots.length;
    for (let i = 0; i < totalLength; ++i) {
      let index = this._startSlotIndex + i;
      if (index >= totalLength) index -= totalLength;
      historyTimeData.push({
        date: this._historySlots[index],
        value: this._slotData[index],
      });
    }
    historyTimeData.sort((a, b) => b.date - a.date);
    return historyTimeData;
  }

  getByIndex(index) {
    const historyLength = this._historySlots.length;
    let getIndex = (this._startSlotIndex + index) % historyLength;
    if (getIndex < 0) getIndex += historyLength;
    const date = this._historySlots[getIndex];
    const value = this._slotData[getIndex];
    if (date) {
      return {
        date,
        value: value || 0,
      };
    }
    return;
  }
}

export default HistoryStorage;
