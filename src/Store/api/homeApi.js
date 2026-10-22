import baseApi from "../apislice";


export const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLatestCollection: builder.query({
            query: () => ({ url: '/latestCollection', method: 'GET' })
        }),
        getAllProduct: builder.query({
            query: () => ({ url: '/api/products/list', method: 'GET' })
        }),
          getPopularProduct: builder.query({
            query: () => ({ url: '/api/products/popular', method: 'GET' })
        })
    })
})

export const { useGetLatestCollectionQuery, useGetAllProductQuery, useGetPopularProductQuery } = homeApi