import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(mockSetTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const mockSetTimeout = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timeout);
    expect(mockSetTimeout).toHaveBeenCalledWith(callback, timeout);
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const mockSetInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(mockSetInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;

    const mockSetInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timeout);
    expect(mockSetInterval).toHaveBeenLastCalledWith(callback, timeout);
    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(timeout * 2);
    expect(callback).toHaveBeenCalledTimes(3);
    jest.clearAllTimers();
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'main.js';
  const fileContent = 'hello world';

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);
    expect(join).toHaveBeenCalledWith(expect.any(String), pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockReturnValue(fileContent);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toContain(fileContent);
  });
});
