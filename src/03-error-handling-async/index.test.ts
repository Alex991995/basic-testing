import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const str = 'Hello friends';
    const res = await resolveValue(str);
    expect(res).toBe(str);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const str = 'You are not authorized';
    expect(() => throwError(str)).toThrow(new Error(str));
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(new Error('Oops!'));
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const myError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(myError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const myError = new MyAwesomeError();
    expect(() => rejectCustomError()).rejects.toThrow(myError);
  });
});
