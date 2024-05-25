import Matrix from "../../matrix";

it("test resolve", () => {
  const data = [
    [1, 1, 2],
    [1, -2, -1],
    [0, 1, -2]
  ];
  const m = new Matrix(data);
  const s = m.concat([[1], [0], [-2]]);
  s.toIdentity(3);
  const r = s.subMatrix(3);
  const ret = r.toRawData();
  expect(ret).toBeDeepCloseTo([[-1 / 9], [-4 / 9], [7 / 9]], 6);
});
