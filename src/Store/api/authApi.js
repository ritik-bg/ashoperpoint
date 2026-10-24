import baseApi from '../apislice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: '/signin', method: 'POST', body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: '/register', method: 'POST', body }),
    }),
    getOtp:builder.mutation({
        query:(body)=>({url:'/generateOtp',method:'POST',body})
    })
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetOtpMutation } = authApi;
