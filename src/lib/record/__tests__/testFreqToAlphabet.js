import { freqToMusicalAlphabet } from "../toneCalculator";

it("freqToSound A0 - 27.5", () => {
  expect(freqToMusicalAlphabet(27.5)).toEqual({
    zoneNumber: 0,
    soundName: "A"
  });
});

it("freqToSound A4 - 440", () => {
  expect(freqToMusicalAlphabet(440)).toEqual({
    zoneNumber: 4,
    soundName: "A"
  });
});


it("freqToSound D3 - 146.8", () => {
    expect(freqToMusicalAlphabet(146.8)).toEqual({
      zoneNumber: 3,
      soundName: "D"
    });
  });
