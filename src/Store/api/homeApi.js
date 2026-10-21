import baseApi from "../apislice";


export const homeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLatestCollection: builder.query({
            query: () => ({ url: '/latestCollection', method: 'GET' })
        }),
        getAllProduct: builder.query({
            query: () => ({ url: '/log/products/list', method: 'GET' })
        })
    })
})

export const { useGetLatestCollectionQuery, useGetAllProductQuery } = homeApi