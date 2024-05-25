import Matrix from "../../matrix";

it("test identity", () => {
  const data = [
    [1, 1, 2],
    [1, -2, -1],
    [0, 1, -2]
  ];

  const m = new Matrix(data);
  m.toIdentity(3);
  const expectedRet = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  const ret = m.toRawData();
  expect(ret).toBeDeepCloseTo(expectedRet, 5);
});

it("test identity resolve", () => {
  const data = [
    [1, 1, 2, 1],
    [1, -2, -1, 0],
    [0, 1, -2, -2]
  ];

  const m = new Matrix(data);
  m.toIdentity(3);
  const expectedRet = [
    [1, 0, 0, -1 / 9],
    [0, 1, 0, -4 / 9],
    [0, 0, 1, 7 / 9]
  ];
  const ret = m.toRawData();
  expect(ret).toBeDeepCloseTo(expectedRet, 5);
});
