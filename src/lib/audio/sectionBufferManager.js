import { createSoundBuffer } from "./audioCreator";
import { createSectionSoundCreator } from "./soundCreator";

class SectionBufferManager {
  constructor(audioContext, beats, speed, waveType, beapLength = 0.1) {
    this._beats = beats;
    this._speed = speed;
    this._waveType = waveType;
    this._audioContext = audioContext;
    this._beapLength = beapLength;
    this._beatBuffers = this._buildBuffer();
  }

  _buildBuffer() {
    const sectionSoundCreator = createSectionSoundCreator(
      this._beats,
      this._waveType,
      this._beapLength
    );

    return createSoundBuffer(
      this._audioContext,
      (60 / this._speed) * this._beats,
      sectionSoundCreator
    );
  }

  getBuffer() {
    return this._beatBuffers;
  }
}

export default SectionBufferManager;
