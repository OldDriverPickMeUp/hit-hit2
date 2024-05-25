import { distanceInCents, soundNameToFreq } from "../toneCalculator";

it("distance in cents C3-A3 = -900", () => {
  expect(
    distanceInCents(soundNameToFreq(3, "C"), soundNameToFreq(3, "A"))
  ).toBeCloseTo(-900);
});

it("distance in cents A3-C3 = 900", () => {
  expect(
    distanceInCents(soundNameToFreq(3, "A"), soundNameToFreq(3, "C"))
  ).toBeCloseTo(900);
});
