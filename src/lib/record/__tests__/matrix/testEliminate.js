import Matrix from "../../matrix";

it("test eliminate", () => {
  const data = [
    [1, 1, 2],
    [1, -2, -1],
    [0, 1, -2]
  ];

  const m = new Matrix(data);
  m.eliminateCols(3);
  const expectedRet = [
    [1, 1, 2],
    [0, -3, -3],
    [0, 0, -3]
  ];
  const ret = m.toRawData();
  expect(ret).toEqual(expectedRet);
});

it("test eliminate", () => {
  const data = [
    [1, 1, 2, 1],
    [1, -2, -1, 0],
    [0, 1, -2, -2]
  ];

  const m = new Matrix(data);
  m.eliminateCols(3);
  const expectedRet = [
    [1, 1, 2, 1],
    [0, -3, -3, -1],
    [0, 0, -3, -7 / 3]
  ];
  const ret = m.toRawData();
  expect(ret).toEqual(expectedRet);
});
