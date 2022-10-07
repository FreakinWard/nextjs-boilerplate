export function getGaps(BinaryArray, gaps) {
  const firstOne = BinaryArray.indexOf('1');

  if (firstOne > -1) {
    let newBinaryArray = BinaryArray.slice(firstOne + 1);

    const secondOne = newBinaryArray.indexOf('1');

    if (secondOne > 0) {
      gaps.push(secondOne);
    }

    return getGaps(newBinaryArray.slice(secondOne + 1), gaps);
  }

  return gaps.length > 0 ? Math.max.apply(Math, gaps) : 0;
}

export function solution(numberValue) {
  if (numberValue === parseInt(numberValue, 10) && numberValue >= 1 && numberValue <= 2147483647) {
    const binaryValue = numberValue.toString(2).split('');

    return getGaps(binaryValue, []);
  }

  return 0;
}

export function solutionDL(fileSize, byteHistory, overPreviousMinutes) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (overPreviousMinutes <= 0) return 0;
  if (!byteHistory.length) return -1;

  const sumArrayItems = items =>
    items.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

  const bytesCompleted = sumArrayItems(byteHistory);
  const bytesRemaining = fileSize - bytesCompleted;

  if (bytesRemaining <= 0) return 0;

  const bytesPerMinute =
    sumArrayItems(byteHistory.slice(-overPreviousMinutes)) / overPreviousMinutes;

  const minutesRemaining = bytesRemaining / bytesPerMinute;

  return Math.ceil(minutesRemaining);
}

export function solutionTimeAsString(timeInSeconds) {
  const values = [];
  values.push({ value: Math.floor(timeInSeconds / (7 * 3600 * 24)), format: 'm' });
  values.push({ value: Math.floor(timeInSeconds / (7 * 3600 * 24)), format: 'w' });

  values.push({ value: Math.floor(timeInSeconds / (3600 * 24)), format: 'd' });
  values.push({ value: Math.floor((timeInSeconds % (3600 * 24)) / 3600), format: 'h' });
  values.push({ value: Math.floor((timeInSeconds % 3600) / 60), format: 'm' });
  values.push({ value: Math.floor(timeInSeconds % 60), format: 's' });

  const formatValue = ({ value, format }) => `${value}${format}`;

  const positiveValues = values.filter(v => v.value > 0);

  if ((positiveValues.length = 2)) {
    return positiveValues.slice(0, 2).map(formatValue).join('');
  }

  if (positiveValues.length > 2) {
    // return positiveValues.slice(0, 2).map(formatValue).join('');
    return 'test';
  }

  return positiveValues.map(formatValue).join('');

  // const weeks = weeksRemaining > 0 ? `${weeksRemaining}w` : '';
  // const days = daysRemaining > 0 ? `${daysRemaining}d` : '';
  // const hours = hoursRemaining > 0 ? `${hoursRemaining}h` : '';
  // const minutes = minutesRemaining > 0 ? `${minutesRemaining}m` : '';
  // const seconds = secondsRemaining > 0 ? `${secondsRemaining}s` : '0s';
  //
  // return weeks + days + hours + minutes + seconds;
}
// from an integer x representing a time duration in seconds produce a simplified string representation
