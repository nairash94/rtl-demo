import axios from 'axios';

const mockAxios = jest.genMockFromModule<typeof axios>('axios');

// Mock the instance methods
mockAxios.create = jest.fn(() => mockAxios);
mockAxios.get = jest.fn();
mockAxios.post = jest.fn();
mockAxios.put = jest.fn();
mockAxios.patch = jest.fn();
mockAxios.delete = jest.fn();
mockAxios.interceptors = {
  request: {use: jest.fn(), eject: jest.fn(), clear: jest.fn()},
  response: {use: jest.fn(), eject: jest.fn(), clear: jest.fn()},
};

export default mockAxios;
