import { Row } from "../../matrix";

it("test Row", () => {
  const r = new Row([1, 2, 1]);
  const withR = new Row([2, 3, 7]);
  r.eliminate(0, withR);
  expect(r.getData()).toEqual([0, 0.5, -2.5]);
});

it("test match resolve should not match", () => {
  const r = new Row([1, 1, 2, 1]);
  expect(r.matchEliminatedCols([0, 1], true)).toEqual(false);
});

it("test match resolve should match", () => {
  const r = new Row([0, 0, 2, 1]);
  expect(r.matchEliminatedCols([0, 1], true)).toEqual(true);
});
