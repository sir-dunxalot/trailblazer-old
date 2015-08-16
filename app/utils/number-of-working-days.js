export default function numberOfWorkingDays(startDate, endDate) {
  const start = moment(startDate);
  const end = moment(endDate);

  let startOffset = start.day() - 7;
  let endOffset = end.day();

  const endSunday = end.subtract(endOffset, 'days');
  const startSunday = start.subtract(startOffset, 'days');
  const weeks = endSunday.diff(startSunday, 'days') / 7;

  startOffset = Math.abs(startOffset);

  if (startOffset === 7) {
    startOffset = 5;
  } else if(startOffset === 1) {
    startOffset = 0;
  } else {
    startOffset -= 2;
  }

  if (endOffset === 6) {
    endOffset--;
  }

  return (weeks * 5 + startOffset + endOffset).toFixed(0);
}
