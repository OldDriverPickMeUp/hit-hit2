import { getPrevSoundName } from "../toneCalculator";

it("testPrevSound B", () => {
  expect(getPrevSoundName(3, "B")).toEqual({ zoneNumber: 3, soundName: "A#" });
});

it("testPrevSound C", () => {
  expect(getPrevSoundName(3, "C")).toEqual({ zoneNumber: 2, soundName: "B" });
});
