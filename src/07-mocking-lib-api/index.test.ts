import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: (fn: unknown) => fn,
}));

describe('throttledGetDataFromApi', () => {
  const url = 'user/1';
  const response = { data: 'some data' };
  test('should create instance with provided base url', async () => {
    const axiosCreateMock = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue(response),
    });

    (axios.create as jest.Mock).mockImplementation(axiosCreateMock);

    await throttledGetDataFromApi(url);

    expect(axiosCreateMock).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue(response);

    const axiosCreateMock = jest.fn().mockReturnValue({
      get: mockGet,
    });
    (axios.create as jest.Mock).mockImplementation(axiosCreateMock);
    await throttledGetDataFromApi(url);
    expect(mockGet).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue(response);

    const axiosCreateMock = jest.fn().mockReturnValue({
      get: mockGet,
    });
    (axios.create as jest.Mock).mockImplementation(axiosCreateMock);
    const res = await throttledGetDataFromApi(url);
    expect(res).toContain(response.data);
  });
});
