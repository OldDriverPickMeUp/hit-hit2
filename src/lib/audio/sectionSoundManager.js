import SectionBufferManager from "./sectionBufferManager";
import SectionSourceManager from "./sectionSourceManger";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

class SectionSoundManager {
  constructor() {
    this._audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this._source = new SectionSourceManager(this._audioContext);
    this._buffer = null;
    this.onBeatChange = null;
    this.playing = false;
    this._config = {};
    this._hasNewConfig = false;
    this._subject = this._createSubject();
  }

  _createSubject() {
    const subject = new Subject();
    subject.pipe(debounceTime(350)).subscribe({
      next: ({ speed, beats, waveType }) => {
        this._updateConfig(speed, beats, waveType);
        this._stop();
        if (this.playing) {
          this._play();
        }
      }
    });
    return subject;
  }

  updateConfig(speed, beats, waveType) {
    this._subject.next({ speed, beats, waveType });
  }

  _updateConfig(speed, beats, waveType) {
    this._hasNewConfig = true;
    this._config = { speed, beats, waveType };
  }

  _createBuffer() {
    const { speed = 120, beats = 4, waveType = "sine" } = this._config;
    this._hasNewConfig = false;
    return new SectionBufferManager(this._audioContext, beats, speed, waveType);
  }

  _play() {
    if (this._hasNewConfig) {
      this._buffer = this._createBuffer();
    }
    const buffer = this._buffer.getBuffer();
    this._source.feed(buffer, this._onPlayEnd);
  }

  play() {
    if (this.playing) return;
    this.playing = true;
    this._play();
  }

  _stop() {
    this._source.stop();
  }

  stop() {
    if (!this.playing) return;
    this.playing = false;
    this._stop();
  }

  _onPlayEnd = () => {
    console.debug("endddd");
  };
}

export default SectionSoundManager;
