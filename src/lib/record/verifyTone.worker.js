import { autocorrelationFullPartFast } from "./toneCalculator";

export function autocorrelationWorker(arrayInFloat, partStart, partEnd) {
  try {
    return autocorrelationFullPartFast(arrayInFloat, partStart, partEnd);
  } catch (e) {
    console.error(e);
  }
}
