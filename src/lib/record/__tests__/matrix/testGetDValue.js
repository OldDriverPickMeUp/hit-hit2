import { getDValueInX } from "../../toneCalculator";

it("test get D value", () => {
  const value = getDValueInX(20, [10, 11, 9]);
  expect(value).toBeCloseTo(20.833333333333332);
});
