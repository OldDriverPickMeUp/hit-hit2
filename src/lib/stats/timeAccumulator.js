class TimeAccumulator {
  constructor() {
    this._lastTime = 0;
    this._stopped = true;
    this._accumulated = 0;
  }

  feed() {
    const currentTime = performance.now();
    if (this._stopped) {
      this._lastTime = currentTime;
      this._accumulated = 0;
      this._stopped = false;
    }
    const period = currentTime - this._lastTime;
    this._accumulated += period;
    this._lastTime = currentTime;
    return period / 1000;
  }

  stop() {
    this._stopped = true;
  }

  get accumulated() {
    return this._accumulated / 1000;
  }
}

export default TimeAccumulator;
