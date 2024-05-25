import Matrix from "./matrix";

export function getPeaks(dataArray) {
  const peaks = [];
  for (let i = 0; i < dataArray.length - 1; ++i) {
    const nextValue = dataArray[i + 1];
    const currentValue = dataArray[i];
    const formalValue = dataArray[i - 1];
    if (nextValue < currentValue && formalValue < currentValue) {
      peaks.push([i, currentValue]);
    }
  }
  const maxValue = Math.max(...peaks.map(e => e[1]));
  return peaks.map(e => [e[0], e[1] / maxValue]).filter(e => e[1] > 0.8);
}

function sum(dataArray) {
  return dataArray.reduce((sum, next) => sum + next, 0);
}

export function extractPeak(peaks, top) {
  // console.log(peaks,top)
  const sortByValue = peaks.sort((a, b) => b[1] - a[1]);
  // const topK = sortByValue.slice(0, top);
  const sortByIndex = sortByValue.sort((a, b) => a[0] - b[0]);
  const base = sortByIndex[0][0];

  const count = sortByIndex.map(e => Math.round(e[0] / base));
  const total = sum(sortByIndex.map(e => e[0]));

  // console.log(base, sortByIndex, total / sum(count));
  return total / sum(count);
}

export function getMaxPeak(peaks) {
  let maxValue = 0;
  let maxIndex = -1;
  for (let [index, value] of peaks) {
    if (value > maxValue) {
      maxValue = value;
      maxIndex = index;
    }
  }
  if (maxIndex === -1) return;
  return [maxIndex, maxValue];
}

export function getNearest(dataArray, peakIndex, width = 1) {
  if (peakIndex === 0) {
    return dataArray.slice(0, width * 2 + 1);
  }
  return dataArray.slice(peakIndex - width, peakIndex + 1 + width);
}

export function getDValueInX(start, dataArray) {
  try {
    const matrixData = [
      [4, 2, 1],
      [1, 1, 1],
      [0, 0, 1]
    ];
    const m = new Matrix(matrixData);
    const y = [[dataArray[2]], [dataArray[1]], [dataArray[0]]];
    const d = m.concat(y);
    d.toIdentity(3);
    const r = d.subMatrix(3);
    const ret = r.toRawData().map(e => e[0]);
    return (-ret[1] / ret[0]) * 0.5 + start;
  } catch (e) {
    console.warn(e);
    return start + 1;
  }
}

// export function getDValueInXLeastSquare(start, dataArray) {
//   try {
//     const matrixData = [];
//     const size = dataArray.length;
//     const y = [];
//     for (let i = 0; i < size; ++i) {
//       const newRow = [];
//       for (let x = 0; x < size - 1; ++x) {
//         newRow.push(Math.pow(size - x - 1, size - x - 1));
//       }
//       newRow.push(1);
//       y.push([dataArray[size - i - 1]]);
//       matrixData.push(newRow);
//     }

//     return (-ret[1] / ret[0]) * 0.5 + start;
//   } catch (e) {
//     console.warn(e);
//     return start + 1;
//   }
// }

export function movingAverage(dataArray, window) {
  const ret = [];
  for (let i = 0; i < dataArray.length - window; ++i) {
    ret.push(
      dataArray.slice(i, i + window).reduce((sum, next) => sum + next, 0) /
        window
    );
  }
  return ret;
}

export function lowpass(dataArray, ratio) {
  const b = 1 - ratio;
  let tmp = 0;
  return dataArray.map(each => {
    tmp = tmp * b + ratio * each;
    return tmp;
  });
}

export function dotProduct(arrayA, arrayB) {
  if (arrayA.length !== arrayB.length) throw new Error();
  return arrayA
    .map((each, i) => each * arrayB[i])
    .reduce((sum, next) => sum + next, 0);
}

export function autocorrelation(dataArray) {
  const arrayLength = dataArray.length;
  const ret = [];
  for (let i = arrayLength; i > 0; --i) {
    const arrayA = dataArray.slice(arrayLength - i);
    const arrayB = dataArray.slice(0, i);
    ret.push(dotProduct(arrayA, arrayB));
  }
  return ret;
}

export function autocorrelationFull(dataArray) {
  const arrayLength = Math.floor(dataArray.length / 2);
  // const arrayLength = dataArray.length;

  const ret = [];
  for (let i = 0; i < arrayLength; ++i) {
    const arrayA = dataArray;
    const arrayB1 = dataArray.slice(i);
    const arrayB2 = dataArray.slice(0, i);
    ret.push(dotProduct(arrayA, [...arrayB1, ...arrayB2]));
  }
  return ret;
}

export function autocorrelationFullPart(dataArray, partStart, partEnd) {
  const ret = [];
  for (let i = partStart; i < partEnd; ++i) {
    const arrayA = dataArray;
    const arrayB1 = dataArray.slice(i);
    const arrayB2 = dataArray.slice(0, i);
    ret.push(dotProduct(arrayA, [...arrayB1, ...arrayB2]));
  }
  return ret;
}

export function autocorrelationFullFast(dataArray) {
  const arrayLength = Math.floor(dataArray.length / 2);
  const ret = new Float64Array(arrayLength);

  for (let i = 0; i < arrayLength; ++i) {
    const arrayA = dataArray;
    ret[i] = selfDotProductFast(arrayA, i);
  }
  return ret;
}

export function autocorrelationFullPartFast(dataArray, partStart, partEnd) {
  const ret = new Float64Array(partEnd - partStart);
  for (let i = partStart; i < partEnd; ++i) {
    const arrayA = dataArray;
    ret[i - partStart] = selfDotProductFast(arrayA, i);
  }
  return ret;
}

function selfDotProductFast(dataArray, shift) {
  let j;
  let length = dataArray.length;
  let ret = 0;
  for (let i = 0; i < length; ++i) {
    j = i + shift;
    j = j >= length ? j - length : j;
    ret += dataArray[i] * dataArray[j];
  }
  return ret;
}

export function freqToCents(freq, baseFreq = 27.5) {
  if (freq < baseFreq) {
    return;
  }
  return 1200 * Math.log2(freq / baseFreq);
}

export function centsToFreq(cents, baseFreq = 27.5) {
  return Math.pow(2, cents / 1200) * baseFreq;
}

const MUSICAL_ALPHABET_2 = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

function centToMusicalAlphabet2(cents) {
  const count = Math.round(cents / 100) + 9;
  const soundName = MUSICAL_ALPHABET_2[count % 12];
  const zoneNumber = Math.floor(count / 12);
  return { soundName, zoneNumber };
}

function musicalAlphabetToCents(zoneNumber, soundName) {
  const soundIndex = MUSICAL_ALPHABET_2.findIndex(e => e === soundName);
  return (zoneNumber * 12 + soundIndex - 9) * 100;
}

export function freqToMusicalAlphabet(freq) {
  const cents = freqToCents(freq);
  return centToMusicalAlphabet2(cents);
}

export function soundNameToFreq(zoneNumber, soundName) {
  const cents = musicalAlphabetToCents(zoneNumber, soundName);
  return centsToFreq(cents);
}

export function distanceInCents(target, source) {
  return 1200 * Math.log2(target / source);
}

export function getNextSoundName(zoneNumber, soundName) {
  const next = musicalAlphabetToCents(zoneNumber, soundName);
  return centToMusicalAlphabet2(next + 100);
}

export function getPrevSoundName(zoneNumber, soundName) {
  const next = musicalAlphabetToCents(zoneNumber, soundName);
  return centToMusicalAlphabet2(next - 100);
}
