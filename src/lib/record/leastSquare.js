export function resolveLeastSquare(x, y) {
  const xt = x.transpose();
  const t1 = xt.multiply(x);
  const t1r = t1.reverse();
  const b = t1r.multiply(xt);
  return b.multiplyArray(y);
}
