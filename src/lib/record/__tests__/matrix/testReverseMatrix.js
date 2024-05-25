import Matrix from "../../matrix";

it("test identity reverse", () => {
  const data = [
    [1, 1, 2, 1, 0, 0],
    [1, -2, -1, 0, 1, 0],
    [0, 1, -2, 0, 0, 1]
  ];

  const m = new Matrix(data);
  m.toIdentity(3);
  const r = m.subMatrix(3);
  const m2 = new Matrix([
    [1, 1, 2],
    [1, -2, -1],
    [0, 1, -2]
  ]);
  const identity = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  expect(m2.multiply(r).toRawData()).toBeDeepCloseTo(identity, 5);
});
