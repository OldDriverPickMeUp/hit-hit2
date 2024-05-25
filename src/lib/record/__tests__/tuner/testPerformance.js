import { normalize, getMax, lowPass } from "../../recordManager";
import {
  lowpass,
  autocorrelationFullPart,
  autocorrelationFullPartFast
} from "../../toneCalculator";

function triangle(x) {
  if (x > 0.75) {
    return 4 * (x - 1);
  }
  if (x < 0.25) {
    return 4 * x;
  }
  return -x * 4 + 2;
}

function generateSoundDataArray(sampleRate, length, freq) {
  const dataArray = new Float32Array(length);
  const period = 1 / freq;
  const loopFrame = sampleRate * period;
  for (let i = 0; i < length; ++i) {
    const currentLoopFrame = i % loopFrame;
    dataArray[i] = 20 * triangle(currentLoopFrame / loopFrame);
  }
  return dataArray;
}

it("test performance normalize", async () => {
  const freq = 440;
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);

  let start = performance.now();
  let normalized;
  for (let i = 0; i < 100; ++i) {
    const range = Math.abs(Math.max(...dataArray));
    normalized = dataArray.map(each => each / range);
  }
  let time = performance.now() - start;

  const dataArray2 = generateSoundDataArray(sampleRate, 8196, freq);
  start = performance.now();
  for (let i = 0; i < 100; ++i) {
    const max = getMax(dataArray2);
    normalize(dataArray2, max);
  }
  let time2 = performance.now() - start;
  console.log(time2, time);
  expect(time2).toBeLessThan(time);
  expect(normalized).toBeDeepCloseTo(dataArray2, 5);
});

it("test performance lowpass", async () => {
  const freq = 440;
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);

  let start = performance.now();
  let filtered;
  for (let i = 0; i < 100; ++i) {
    filtered = lowpass(dataArray, 0.1);
  }
  let time = performance.now() - start;

  const dataArray2 = generateSoundDataArray(sampleRate, 8196, freq);
  start = performance.now();
  for (let i = 0; i < 100; ++i) {
    lowPass(dataArray2, 0.1);
  }
  let time2 = performance.now() - start;
  console.log(time2, time);
  expect(time2).toBeLessThan(time);
  // expect(filtered).toBeDeepCloseTo(dataArray2, 5);
});

it("test performance autocorr", async () => {
  const freq = 440;
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);

  let start = performance.now();
  let corred;
  for (let i = 0; i < 10; ++i) {
    corred = autocorrelationFullPart(dataArray, 400, 1200);
  }
  let time = performance.now() - start;

  const dataArray2 = generateSoundDataArray(sampleRate, 8196, freq);
  start = performance.now();
  let corred2;
  for (let i = 0; i < 10; ++i) {
    corred2 = autocorrelationFullPartFast(dataArray2, 400, 1200);
  }
  let time2 = performance.now() - start;
  console.log(time2, time);
  expect(time2).toBeLessThan(time);
  expect(corred).toBeDeepCloseTo(corred2, 1);
});
