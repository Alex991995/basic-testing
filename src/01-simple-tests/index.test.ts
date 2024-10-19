import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const plus: Action = Action.Add;
    const rawInput = {
      a: 1,
      b: 2,
      action: plus,
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(3);
  });

  test('should subtract two numbers', () => {
    const subtract: Action = Action.Subtract;
    const rawInput = {
      a: 3,
      b: 2,
      action: subtract,
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(1);
  });

  test('should multiply two numbers', () => {
    const multiply: Action = Action.Multiply;
    const rawInput = {
      a: 3,
      b: 2,
      action: multiply,
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(6);
  });

  test('should divide two numbers', () => {
    const divide: Action = Action.Divide;
    const rawInput = {
      a: 6,
      b: 2,
      action: divide,
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const exponentiate: Action = Action.Exponentiate;
    const rawInput = {
      a: 6,
      b: 2,
      action: exponentiate,
    };
    const res = simpleCalculator(rawInput);
    expect(res).toBe(36);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 1,
      b: 2,
      action: '**',
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const plus: Action = Action.Add;
    const rawInput = {
      a: '1',
      b: 2,
      action: plus,
    };

    const res = simpleCalculator(rawInput);
    expect(res).toBe(null);
  });
});
