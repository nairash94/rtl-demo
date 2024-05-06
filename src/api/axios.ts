import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

type ErrorMap = {
  Code: string;
  Message?: string;
  message?: string;
  ValidationError: string;
};

type HeadersType = Readonly<Record<string, string | boolean>>;
const apiheaders: HeadersType = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZmZkYjY0NmJhZDhlZDE1MTRjOWY3YzJlY2E3ZjFjNyIsInN1YiI6IjY2MzIxMzAyNDcwZWFkMDEyYTEwNmYxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uW7tC2ZlF7AMffDluNhDP02MfIVZUUirYuOClE3WhMg',
};

class Http {
  private instance: AxiosInstance | null = null;
  private baseUri: string;
  private headers: HeadersType;

  constructor(baseUri = 'https://api.themoviedb.org/', headers = apiheaders) {
    this.baseUri = baseUri;
    this.headers = headers;
  }

  private get http(): AxiosInstance {
    return this.instance ?? this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: this.baseUri,
      headers: this.headers,
    });

    http.interceptors.response.use(
      response => response,
      error => {
        return this.handleError(error);
      },
    );

    this.instance = http;
    return http;
  }

  request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request(config);
  }

  get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  // Handle global app errors
  private handleError(error: AxiosError<ErrorMap>) {
    if (error.code === 'ERR_NETWORK') {
      error.message = 'No Internet Connectivity';
    }
    return Promise.reject(error);
  }
}

const axiosClient = new Http();
export {axiosClient};
