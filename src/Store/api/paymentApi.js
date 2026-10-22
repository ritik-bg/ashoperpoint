
import baseApi from '../apislice';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (body) => ({
        url: '/payment/create-order', 
        method: 'POST',
        body
      }),
    }),
    verifyPayment: builder.mutation({
      query: (body) => ({
        url: '/payment/verify',
        method: 'POST',
        body, // { razorpay_order_id, razorpay_payment_id, razorpay_signature }
      }),
      // refetch the cart after payment (server clears it).
      // Use the same tag name your cart query provides.
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useCreateOrderMutation, useVerifyPaymentMutation } = paymentApi;