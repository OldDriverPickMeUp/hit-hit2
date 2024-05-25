export function autocorrelationMapper(arrayLength, partCnt) {
  const step = Math.ceil(arrayLength / partCnt);
  const groups = [];
  for (let i = 0; i < partCnt; ++i) {
    const start = i * step;
    const end = start + step;
    groups.push([start, end > arrayLength ? arrayLength : end]);
  }
  return groups;
}
