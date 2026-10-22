import baseApi from "../apislice";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({ url: '/api/cart', method: 'GET' })
        }),
        addToCart: builder.mutation({
            query: (body) => ({ url: '/api/addtocart', method: 'POST', body })
        })
    })
})

export const { useGetCartItemsQuery, useAddToCartMutation } = cartApi;