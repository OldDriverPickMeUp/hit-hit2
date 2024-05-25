class SectionSourceManager {
  constructor(audioContext) {
    this._audioContext = audioContext;
    this._source = null;
    this._stopped = true;
  }

  feed(buffer, onPlayEnd) {
    this.stop();
    const source = this._audioContext.createBufferSource();
    source.loop = true;
    source.buffer = buffer;
    source.connect(this._audioContext.destination);
    source.start();
    this._stopped = false;
    source.onended = onPlayEnd;
    this._source = source;
  }

  stop() {
    if (!this._source) return;
    if (this._stopped) return;
    this._source.stop();
    this._stopped = true;
  }
}

export default SectionSourceManager;
