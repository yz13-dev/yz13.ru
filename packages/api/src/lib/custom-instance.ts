import Axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { API_URL } from '../../config';




const getUrl = () => {
  try {
    const APP_URL = process.env.APP_URL;

    // @ts-expect-error
    const VITE_APP_URL = import.meta?.env?.VITE_APP_URL;

    if (!APP_URL && !VITE_APP_URL) throw new Error("APP_URL is not defined");

    const envURL = APP_URL || VITE_APP_URL;

    const url = new URL(envURL);


    return url.origin;
  } catch (error) {
    console.warn(error)
    return "localhost:5173"
  }
}

export const AXIOS_INSTANCE = Axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": getUrl(),
  }
}); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query

export const axios = <T>(

  config: AxiosRequestConfig,

  options?: AxiosRequestConfig,

): Promise<T> => {


  const source = Axios.CancelToken.source();

  const configHeaders = config.headers;

  const optionsHeaders = options?.headers;

  const headers = {
    ...configHeaders,
    ...optionsHeaders,
  }

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    headers,
    withCredentials: true,
    cancelToken: source.token,
  })
    .then(({ data }) => {
      return data
    })
    .catch((error: AxiosError<T>) => {
      const data = error.response?.data;
      if (data) {
        return data
      }
      return
    });




  // @ts-ignore

  promise.cancel = () => {

    source.cancel('Query was cancelled');

  };



  return promise;

};



// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this

export type BodyType<BodyData> = BodyData;
export type ErrorType<Error> = AxiosError<Error>;

// Or, in case you want to wrap the body type (optional)

// (if the custom instance is processing data before sending it, like changing the case for example)

// export type BodyType<BodyData> = CamelCase<BodyData>;
