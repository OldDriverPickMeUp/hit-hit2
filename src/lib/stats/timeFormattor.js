export function parseTimePeriod(timeInSecond) {
  const hours = Math.floor(timeInSecond / 3600);
  const hourleft = timeInSecond - hours * 3600;
  const minutes = Math.floor(hourleft / 60);
  const seconds = hourleft - 60 * minutes;
  return {
    hour: hours,
    minute: minutes,
    second: Math.round(seconds)
  };
}
