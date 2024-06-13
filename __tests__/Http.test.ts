import axios from 'axios';
import {axiosClient} from '../src/api/axios'; // Adjust the import path
import mockAxios from '../__mocks__/axios';

jest.mock('axios');

describe('Http class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request', async () => {
    const mockResponse = {data: 'test data'};
    (mockAxios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await mockAxios.get('test/url');

    expect(mockAxios.get).toHaveBeenCalledWith('test/url');
    expect(response.data).toEqual('test data');
  });

  it('should make a POST request', async () => {
    const mockResponse = {data: 'post response'};
    (mockAxios.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await mockAxios.post('test/url', {key: 'value'});

    expect(mockAxios.post).toHaveBeenCalledWith('test/url', {key: 'value'});
    expect(response.data).toEqual('post response');
  });

  it('should make a PUT request', async () => {
    const mockResponse = {data: 'put response'};
    (axios.put as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await axiosClient.put('test/url', {key: 'value'});

    expect(axios.put).toHaveBeenCalledWith(
      'test/url',
      {key: 'value'},
      undefined,
    );
    expect(response.data).toEqual('put response');
  });

  it('should make a PATCH request', async () => {
    const mockResponse = {data: 'patch response'};
    (axios.patch as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await axiosClient.patch('test/url', {key: 'value'});

    expect(axios.patch).toHaveBeenCalledWith(
      'test/url',
      {key: 'value'},
      undefined,
    );
    expect(response.data).toEqual('patch response');
  });

  it('should make a DELETE request', async () => {
    const mockResponse = {data: 'delete response'};
    (axios.delete as jest.Mock).mockResolvedValueOnce(mockResponse);

    const response = await axiosClient.delete('test/url');

    expect(axios.delete).toHaveBeenCalledWith('test/url', undefined);
    expect(response.data).toEqual('delete response');
  });

  it('should handle network error', async () => {
    const error = {
      code: 'ERR_NETWORK',
      message: 'Network Error',
      isAxiosError: true,
      response: undefined,
      config: {},
      toJSON: () => ({}),
    };
    (axios.get as jest.Mock).mockRejectedValueOnce(error);

    try {
      await axiosClient.get('test/url');
    } catch (err) {
      expect(err.message).toBe('Network Error');
    }
  });
});
