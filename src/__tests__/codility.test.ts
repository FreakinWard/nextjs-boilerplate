import { getGaps, solution, solutionDL, solutionTimeAsString } from './codility';

describe('codility', () => {
  it.skip('should do it', () => {
    // arrange4
    const numberValue = 1041;

    const binaryValue = Number(numberValue).toString(2);
    const result = binaryValue.match(/(.)\1*/g).sort((a, b) => b.length - a.length)[0];

    const expectedBinary = '1001';
    const expectedResult = '0';

    // act
    // assert
    // expect(binaryValue).toEqual(expectedBinary);
    expect(result).toEqual(expectedResult);
  });
});

describe('binary-gap', () => {
  const theories = [
    // { numberValue: 9, expectedBinary: 1001, expectedResult: 2 },
    // { numberValue: 529, expectedBinary: 1000010001, expectedResult: 4 },
    // { numberValue: 51272, expectedBinary: 1100100001001000, expectedResult: 4 },
    // { numberValue: 15, expectedBinary: 1111, expectedResult: 0 },
    // { numberValue: 328, expectedBinary: 101001000, expectedResult: 2 },
    { numberValue: 66561, expectedBinary: 10000010000000001, expectedResult: 2 },
  ];

  // it('returns the binary gap for the number $numberValue and returns $expectedResult', theory => {
  it.each(theories)(
    'the binary gap for the number $numberValue is $expectedResult - $expectedBinary',
    ({ numberValue, expectedBinary, expectedResult }) => {
      // arrange
      const binaryValue = Number(numberValue).toString(2);
      // console.log(`${binaryValue} - ${expectedBinary.toString()}`);

      // act
      const result = solution(numberValue);

      // assert
      expect(binaryValue).toEqual(Number.toString(expectedBinary));
      expect(result).toEqual(expectedResult);
    }
  );
});

describe('download-estimate', () => {
  const theories = [
    { fileSize: 100, byteHistory: [10, 6, 6, 8], overPreviousMinutes: 2, expectedResult: 10 },
    { fileSize: 10, byteHistory: [2, 3], overPreviousMinutes: 2, expectedResult: 2 },
    { fileSize: 100, byteHistory: [2, 3], overPreviousMinutes: 2, expectedResult: 38 },
    { fileSize: 100, byteHistory: [2, 3, 5, 10], overPreviousMinutes: 3, expectedResult: 14 },
    { fileSize: 1, byteHistory: [2, 3], overPreviousMinutes: 2, expectedResult: 0 },
    { fileSize: 1, byteHistory: [2, 3], overPreviousMinutes: 0, expectedResult: 0 },
    { fileSize: 1, byteHistory: [2, 3], overPreviousMinutes: -1, expectedResult: 0 },
    { fileSize: 1, byteHistory: [], overPreviousMinutes: 3, expectedResult: -1 },
    { fileSize: -1, byteHistory: [2, 3], overPreviousMinutes: 3, expectedResult: 0 },
  ];

  it('should return expected estimate', () => {
    // it.each(theories)(
    //   'should return expected estimate',
    //   ({ fileSize, byteHistory, overPreviousMinutes, expectedResult }) => {
    // arrange
    const x = 100;
    const b = [10, 6, 6, 8];
    const z = 2;

    // const expectedResult = 10;

    // const result = solutionDL(x, b, z);
    theories.forEach(({ fileSize, byteHistory, overPreviousMinutes, expectedResult }) => {
      // act
      const result = solutionDL(fileSize, byteHistory, overPreviousMinutes);

      // assert
      expect(result).toEqual(expectedResult);
    });
  });
});

describe.only('time as a string', () => {
  it('should render', () => {
    // arrange
    const theories = [
      { seconds: 100, expected: '1m40s' },
      { seconds: 7263, expected: '2h2m' },
    ];

    theories.forEach(({ seconds, expected }) => {
      // act
      const result = solutionTimeAsString(seconds);

      // assert
      expect(result).toEqual(expected);
    });
  });
});
