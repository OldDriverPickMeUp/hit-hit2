//TODO use generator instead

function sine(x) {
  return (
    Math.sin(Math.PI * x) +
    Math.sin(2 * Math.PI * x) +
    Math.sin(4 * Math.PI * x)
    // Math.sin(6 * Math.PI * x)
  );
}

function square(x) {
  return x > 0.5 ? -1 : 1;
}

function triangle(x) {
  if (x > 0.75) {
    return 4 * (x - 1);
  }
  if (x < 0.25) {
    return 4 * x;
  }
  return -x * 4 + 2;
}

function sawtooth(x) {
  return 2 * x - 1;
}

function getWaveFunc(waveType) {
  if (waveType === "sine") return sine;
  if (waveType === "square") return square;
  if (waveType === "triangle") return triangle;
  if (waveType === "sawtooth") return sawtooth;
  return sine;
}

function createBeatSoundCreator(frequency, length, waveType) {
  const period = 1 / frequency;
  const waveFunc = getWaveFunc(waveType);
  function beatSoundCreator(currentFrame, frameRate) {
    const loopFrame = frameRate * period;
    const stopFrame = frameRate * length;
    if (currentFrame >= stopFrame) return 0;
    const currentLoopFrame = currentFrame % loopFrame;
    return waveFunc(currentLoopFrame / loopFrame);
  }
  return beatSoundCreator;
}

export function createSectionSoundCreator(beats, waveType, length) {
  const beatSoundCreators = [];
  for (let i = 0; i < beats; ++i) {
    if (i < 1) {
      beatSoundCreators.push(createBeatSoundCreator(880, length, waveType));
      continue;
    }
    beatSoundCreators.push(createBeatSoundCreator(440, length, waveType));
  }

  function sectionSoundCreator(currentFrame, totalFrame, frameRate) {
    const eachFrame = totalFrame / beats;
    const currentBeatFrame = Math.floor(currentFrame % eachFrame);
    const currentBeat = Math.floor(currentFrame / eachFrame);
    const beatSoundCreator = beatSoundCreators[currentBeat];
    return beatSoundCreator(currentBeatFrame, frameRate);
  }
  return sectionSoundCreator;
}
