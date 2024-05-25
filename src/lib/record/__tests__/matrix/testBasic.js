import Matrix from "../../matrix";

it("test matrix multiply", () => {
  const m1 = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ]);

  const m2 = new Matrix([
    [1, 2, 1],
    [1, 1, 2],
    [2, 1, 1]
  ]);

  const mRet = m1.multiply(m2);
  const expectedRet = [
    [9, 7, 8],
    [21, 19, 20],
    [15, 22, 23]
  ];

  const ret = mRet.toRawData();
  expect(ret).toBeDeepCloseTo(expectedRet, 5);
});

it("test matrix multiply array", () => {
  const m1 = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ]);

  const a = new Matrix([[1], [1], [2]]);

  const mRet = m1.multiplyArray(a);
  const expectedRet = [[9], [21], [15]];

  const ret = mRet.toRawData();
  expect(ret).toBeDeepCloseTo(expectedRet, 5);
});

it("test matrix transpose", () => {
  const m = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0]
  ]);

  const mRet = m.transpose();
  const expectedRet = [
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 0]
  ];

  const ret = mRet.toRawData();
  expect(ret).toBeDeepCloseTo(expectedRet, 5);
});
