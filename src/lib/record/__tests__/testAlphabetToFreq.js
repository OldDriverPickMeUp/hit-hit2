import { soundNameToFreq } from "../toneCalculator";

it("sound to freq 27.5-A0", () => {
  expect(soundNameToFreq(0, "A")).toEqual(27.5);
});

it("sound to freq 440-A4", () => {
  expect(soundNameToFreq(4, "A")).toEqual(440);
});
