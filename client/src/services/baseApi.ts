import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4000/graphql')

const rawBaseQuery = graphqlRequestBaseQuery({ client })

const customBaseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
    let parsedArgs = args

    if (typeof args === 'object' && args.document && args.document instanceof String) {
        parsedArgs = {
            ...args,
            document: (args.document as string).toString(),
        }
    }

    return rawBaseQuery(parsedArgs, api, extraOptions)
}

export const api = createApi({
    baseQuery: customBaseQuery,
    endpoints: () => ({}),
})
