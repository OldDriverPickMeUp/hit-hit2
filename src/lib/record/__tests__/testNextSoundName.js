import { getNextSoundName } from "../toneCalculator";

it("testNextSound B", () => {
  expect(getNextSoundName(3, "B")).toEqual({ zoneNumber: 4, soundName: "C" });
});

it("testNextSound E", () => {
  expect(getNextSoundName(3, "E")).toEqual({ zoneNumber: 3, soundName: "F" });
});
