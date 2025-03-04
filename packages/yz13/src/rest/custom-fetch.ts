"use server";

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return c.json();
  }

  if (contentType && contentType.includes("application/pdf")) {
    return c.blob() as Promise<T>;
  }

  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const baseUrl = process.env.API_URL || "http://localhost:3000";

  const url = new URL(contextUrl, baseUrl);
  const pathname = url.pathname;
  const search = url.search;

  const requestUrl = new URL(`${pathname}${search}`, baseUrl);

  return requestUrl.toString();
};

// NOTE: Add headers
const getHeaders = async (headers?: HeadersInit): Promise<HeadersInit> => {
  return new Headers(headers);
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  const request = new Request(requestUrl, requestInit);
  const response = await fetch(request);
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};
