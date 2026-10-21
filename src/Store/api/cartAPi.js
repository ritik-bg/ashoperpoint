import baseApi from "../apislice";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCartItems: builder.query({
            query: () => ({ url: '/log/cart', method: 'GET' })
        }),
        addToCart: builder.mutation({
            query: (body) => ({ url: '/log/addtocart', method: 'POST', body })
        })

    })
})

export const { useGetCartItemsQuery, useAddToCartMutation } = cartApi;