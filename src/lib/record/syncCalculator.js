import {
  getMaxPeak,
  getPeaks,
  autocorrelationFullFast
} from "./toneCalculator";
import { lowPass } from "./recordManager";

export function getFreqSync(arrayInFloat, sampleRate, props) {
    const { lowpassK = 0.1 } = props || {};
    const filtered = lowPass(arrayInFloat, lowpassK);
    const autocorrelationData = autocorrelationFullFast(filtered);

    const slicedData = autocorrelationData;
    const maxValue = Math.max(...slicedData.map(each => Math.abs(each)));
    const normalized = slicedData.map(each => each / maxValue);
    const peak = getMaxPeak(getPeaks(normalized));
    let freqValue = 0;
    if (peak) {
      const freqIndex = peak[0];
      freqValue = sampleRate / freqIndex;
      console.log(freqValue);
    }
    return [freqValue, [slicedData, peak]];
}
