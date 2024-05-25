import RecordManager from "../../recordManager";
import {
  soundNameToFreq,
  autocorrelationFullPartFast
} from "../../toneCalculator";

Object.defineProperty(window, "AudioContext", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

function triangle(x) {
  if (x > 0.75) {
    return 4 * (x - 1);
  }
  if (x < 0.25) {
    return 4 * x;
  }
  return -x * 4 + 2;
}

function sine(x) {
  return 2 * Math.PI * x;
}

function generateSoundDataArray(sampleRate, length, freq) {
  const period = 1 / freq;
  const loopFrame = sampleRate * period;
  const dataArray = [];
  for (let i = 0; i < length; ++i) {
    const currentLoopFrame = i % loopFrame;
    dataArray.push(sine(currentLoopFrame / loopFrame));
  }
  return dataArray;
}

it("test record manager 440", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = 440;
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 1);
});

it("test record manager E2", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(2, "E");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 1);
});

it("test record manager A3", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(3, "A");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 1);
});

it("test record manager D3", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(3, "D");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 0.1);
});

it("test record manager G3", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(3, "G");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 0.1);
});

it("test record manager B3", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(3, "B");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 0.1);
});

it("test record manager E4", async () => {
  const r = new RecordManager();
  r._useWorker = () => ({
    autocorrelationWorker: async (dataArray, partStart, partEnd) => {
      return autocorrelationFullPartFast(dataArray, partStart, partEnd);
    }
  });
  const freq = soundNameToFreq(4, "E");
  const sampleRate = 44100;
  const dataArray = generateSoundDataArray(sampleRate, 8196, freq);
  const ret = await r._getFreqFrom(dataArray, sampleRate, { useDValue: false });
  expect(ret[0]).toBeCloseTo(freq, 0.1);
});
