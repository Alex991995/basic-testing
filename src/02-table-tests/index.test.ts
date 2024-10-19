// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 15, b: 10, action: Action.Subtract, expected: 5 },
  { a: 10, b: 5, action: Action.Subtract, expected: 5 },

  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },

  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 8, b: 2, action: Action.Divide, expected: 4 },
  { a: 36, b: 6, action: Action.Divide, expected: 6 },

  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
];

describe('simpleCalculator', () => {
  test('should test testCases array', () => {
    testCases.forEach((item) => {
      const res = simpleCalculator(item);
      expect(res).toBe(item.expected);
    });
  });
});
