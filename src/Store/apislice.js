import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Baseurl } from "../api.config";
import { storageManager } from "../Utils/storageManager";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: Baseurl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    if (token && !headers.has("authorization")) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithTransform = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // 1. HTTP failures (401, 500, network error) -> one consistent error shape

  // if( result.error.status == 401) return storageManager.clearAuth()
  if (result.error) {
    return {
      error: {
        status: result.error.status,
        message:
          result.error.data?.message || result.error.error || "Something went wrong",
        data: result.error.data,
      },
    };
  }

  const body = result;

  // 2. API returned HTTP 200 but { success: false }
  if (body && body.status === false) {
    return {
      error: {
        status: result.meta?.response?.status,
        message: body.message || "Request failed",
        data: body,
      },
    };
  }

  // 3. Success: unwrap { success, data: {...} } -> {...}
  return {
    data: body && "data" in body ? body.data : body,
    meta: result.meta,
  };
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithTransform,
  endpoints: () => ({}),
});

export default baseApi;