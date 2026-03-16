import * as Types from './graphql-types'

import { TypedDocumentString } from './graphql-types'
import { api } from '@/services/baseApi'

export const GetBooksDocument = new TypedDocumentString(`
    query GetBooks {
  books {
    title
    author
  }
}
    `)

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        GetBooks: build.query<Types.GetBooksQuery, Types.GetBooksQueryVariables | void>({
            query: (variables) => ({ document: GetBooksDocument, variables }),
        }),
    }),
})

export { injectedRtkApi as api }
export const { useGetBooksQuery, useLazyGetBooksQuery } = injectedRtkApi
