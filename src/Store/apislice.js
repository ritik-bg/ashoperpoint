import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Baseurl } from "../api.config";

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: Baseurl,
        prepareHeaders: (headers, { getState, args }) => {
            const token = getState().auth.token || localStorage.getItem('token');
            if (!headers.has('authorization') && token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            // const isFormData = args && args.body instanceof FormData

            // if (!isFormData) {
            //     headers.set('content-type', 'application/json')
            // }
            return headers;
        }
    }),

    endpoints: () => ({ })
})

export default baseApi;