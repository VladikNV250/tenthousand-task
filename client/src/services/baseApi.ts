import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
    (import.meta.env.VITE_GRAPHQL_URL as string) || 'http://localhost:4000/graphql',
)

const rawBaseQuery = graphqlRequestBaseQuery({ client })

/**
 * WORKAROUND: Custom base query to fix `graphql-request` crashing with `TypedDocumentString`.
 * * Our generated GraphQL queries use `TypedDocumentString`, which extends the native `String` class.
 * Because `typeof document === 'object'`, the underlying `graphql-request` library incorrectly assumes
 * it is an AST node (DocumentNode) and tries to call `.filter` on its definitions, resulting in a crash.
 * * This interceptor checks if the document is an instance of `String` and explicitly calls `.toString()`
 * to convert it into a primitive string before passing it to `graphqlRequestBaseQuery`.
 */
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

const rootApi = createApi({
    baseQuery: customBaseQuery,
    tagTypes: ['Forms', 'Responses'],
    endpoints: () => ({}),
})

export const api = rootApi.enhanceEndpoints({
    endpoints: {
        GetAllForms: {
            providesTags: ['Forms'],
        },
        GetFormById: {
            providesTags: (_result: unknown, _error: unknown, arg: { id: string }) => [
                { type: 'Forms' as const, id: arg.id },
            ],
        },
        GetResponsesByForm: {
            providesTags: (_result: unknown, _error: unknown, arg: { formId: string }) => [
                { type: 'Responses' as const, id: arg.formId },
            ],
        },
        CreateNewForm: {
            invalidatesTags: ['Forms'],
        },
        SubmitFormResponse: {
            invalidatesTags: (_result: unknown, _error: unknown, arg: { formId: string }) => [
                { type: 'Responses' as const, id: arg.formId },
            ],
        },
    },
})
