import baseApi from "../apislice";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({ url: '/api/cart', method: 'GET' }),
             providesTags: ['Cart'],
        }),
        addToCart: builder.mutation({
            query: (body) => ({ url: '/api/cart/addtocart', method: 'POST', body })
        }),
        deleteProduct: builder.mutation({
            query: (body) => ({ url: '/api/cart/deleteProduct', method: 'DELETE', body }),
             invalidatesTags: ['Cart'],
        }),
         getConfirmedOrder: builder.mutation({
            query: (body) => ({ url: '/api/cart/getConfirmedOrder', method: 'POST', body }),
             invalidatesTags: ['Cart'],
        })
    })
})

export const { useGetCartItemsQuery, useAddToCartMutation, useDeleteProductMutation , useGetConfirmedOrderMutation} = cartApi;