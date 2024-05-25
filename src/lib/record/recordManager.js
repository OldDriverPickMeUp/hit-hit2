import verifyToneWorker from "workerize-loader!./verifyTone.worker"; // eslint-disable-line
import { autocorrelationMapper } from "./autocorrelation";

import {
  getPeaks,
  getDValueInX,
  getNearest,
  extractPeak
} from "./toneCalculator";

export function getMax(dataArray) {
  let max = 0;
  for (let i = 0; i < dataArray.length; ++i) {
    let data = Math.abs(dataArray[i]);
    if (data > max) {
      max = data;
    }
  }
  return max;
}

export function normalize(dataArray, max) {
  for (let i = 0; i < dataArray.length; ++i) {
    dataArray[i] /= max;
  }
  return dataArray;
}

// function copy(dataArray) {
//   let ret = new Float64Array(dataArray.length);
//   for (let i = 0; i < dataArray.length; ++i) {
//     ret[i] = dataArray[i];
//   }
//   return ret;
// }

export function lowPass(dataArray, ratio) {
  const b = 1 - ratio;
  let integral = 0;
  for (let i = 0; i < dataArray.length; ++i) {
    dataArray[i] = dataArray[i] * ratio + integral * b;
    integral = dataArray[i];
  }
  return dataArray;
}

export function drawCanvas(canvas, inData) {
  const [data, peak] = inData;
  if (!peak) return;
  const canvasCtx = canvas.getContext("2d");
  canvasCtx.fillStyle = "rgb(255, 255, 255)";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = "rgb(0, 0, 0)";
  canvasCtx.beginPath();
  const sliceWidth = (canvas.width * 1.0) / data.length;
  let x = 0;
  const max = Math.max(...data.map(Math.abs));
  const newData = data.map(each => each / max);
  let peakPoint = {};
  for (let i = 0; i < newData.length; i++) {
    const v = (newData[i] * canvas.height) / 2;
    const y = canvas.height / 2 - v;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    if (i === peak) {
      peakPoint.x = x;
      peakPoint.y = y;
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();
  canvasCtx.strokeStyle = "rbg(255,0,0)";

  canvasCtx.beginPath();
  canvasCtx.arc(peakPoint.x, peakPoint.y, 3, 0, Math.PI * 2);
  canvasCtx.closePath();
  canvasCtx.stroke();
}

function convertType(incomingData) {
  let i,
    l = incomingData.length;
  let outputData = new Float64Array(incomingData.length);
  for (i = 0; i < l; i++) {
    outputData[i] = (incomingData[i] - 128) / 128.0;
  }
  return outputData;
}

class RecordManager {
  constructor() {
    this._started = false;
    this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    this._bufferLength = null;
    this._dataArray = null;
    this._analyser = null;
    this._mediaStream = null;
    this.onFreqChange = null;
    this._tunerProps = null;
    // this._worker = verifyToneWorker();
    this._workers = [];
    this._maxWorker = 4;
    this._currentWorker = -1;
  }

  _useWorker() {
    if (this._workers.length < this._maxWorker) {
      this._workers.push(verifyToneWorker());
    }
    this._currentWorker += 1;
    if (this._currentWorker >= this._workers.length) {
      this._currentWorker = 0;
    }
    return this._workers[this._currentWorker];
  }

  _createAnalyzerNode() {
    const analyzer = this._audioCtx.createAnalyser();
    analyzer.fftSize = 8192 * 2;

    // analyzer.fftSize = 4096;
    // analyzer.fftSize = 2048;

    return analyzer;
  }

  _startRecord = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this._mediaStream = stream;
    const source = this._audioCtx.createMediaStreamSource(stream);
    const analyzer = this._createAnalyzerNode();
    this._analyser = analyzer;
    const currentBufferLength = this._analyser.frequencyBinCount;
    if (this._bufferLength !== currentBufferLength) {
      this._bufferLength = currentBufferLength;
      this._dataArray = new Uint8Array(this._bufferLength);
    }
    if (!this._dataArray) {
      this._dataArray = new Uint8Array(this._bufferLength);
    }
    source.connect(this._analyser);
  };

  start = onFail => {
    if (this._started) return;
    if (!navigator.mediaDevices) {
      alert("Your browser do not support this functionality!");
      return;
    }
    this._started = true;
    this._startRecord()
      .then(() => {
        this._audioCtx.resume();
        this._inspectSound();
      })
      .catch(e => {
        console.error(e);
        alert(e);
        alert(
          "If you see this message, it means that tuner functionality is not support on your browser or device. Try use lastest Chrome or Firefox!!!"
        );
        this._started = false;
        onFail && onFail();
      });
  };

  stop = () => {
    this._started = false;
    this._audioCtx.suspend();
    if (!this._mediaStream) return;
    const tracks = this._mediaStream.getTracks();
    tracks.forEach(each => each.stop());
  };

  get tuning() {
    return this._started;
  }

  setProps(props) {
    this._tunerProps = { ...this._tunerProps, ...props };
  }

  _inspectSound = () => {
    if (!this._started) return;
    this._analyser.getByteTimeDomainData(this._dataArray);
    const arrayInFloat = convertType(this._dataArray);
    const range = getMax(arrayInFloat);
    if (range < 0.001) {
      setTimeout(this._inspectSound, 30);
      return;
    }
    const normalized = normalize(arrayInFloat, range);

    // let start = performance.now();
    this._getFreqFrom(normalized, this._audioCtx.sampleRate, this._tunerProps)
      .then(ret => {
        this.onFreqChange && this.onFreqChange(ret);
        // console.log(performance.now() - start);
        setTimeout(this._inspectSound, 30);
      })
      .catch(console.error);
  };

  async _getFreqFrom(arrayInFloat, sampleRate, props) {
    const { lowpassK = 0.1, useDValue = false } = props || {};
    const filtered = lowPass(arrayInFloat, lowpassK);
    const autocorrelationData = await this._calcAutocorrelation(filtered);

    // const slicedData = autocorrelationData.slice(
    //   autocorrelationData.length / 2
    // );
    const maxValue = getMax(autocorrelationData);
    const normalized = normalize(autocorrelationData, maxValue);
    const peak = extractPeak(getPeaks(normalized), 10);
    let freqValue = 0;
    if (peak) {
      const freqIndex = peak;
      if (useDValue) {
        const nearest = getNearest(normalized, freqIndex);
        const newFreqIndex = getDValueInX(freqIndex - 1, nearest);
        // console.log(newFreqIndex);
        freqValue = sampleRate / newFreqIndex;
      } else {
        freqValue = sampleRate / freqIndex;
      }
      console.log(freqValue, "hz");
    }
    return [freqValue, [autocorrelationData, peak]];
  }

  async _calcAutocorrelation(arrayInFloat) {
    const groups = autocorrelationMapper(
      arrayInFloat.length / 2,
      this._maxWorker
    );
    const retList = await this._calcAutocorrelationParallel(
      arrayInFloat,
      groups
    );
    let retLength = 0;
    for (let e of retList) {
      retLength += e.length;
    }
    let ret = new Float64Array(retLength);
    let totalLength = 0;
    for (let e of retList) {
      for (let i = 0; i < e.length; ++i) {
        ret[totalLength + i] = e[i];
      }
      totalLength += e.length;
    }
    return ret;
  }

  async _calcAutocorrelationParallel(arrayInFloat, groups) {
    const promises = [];
    for (let [start, end] of groups) {
      promises.push(
        this._useWorker().autocorrelationWorker(arrayInFloat, start, end)
      );
    }
    return await Promise.all(promises);
  }
}

export default RecordManager;
