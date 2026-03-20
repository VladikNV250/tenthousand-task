import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient(
    (import.meta.env.VITE_GRAPHQL_URL as string) || 'http://localhost:4000/graphql',
)

const rawBaseQuery = graphqlRequestBaseQuery({ client })

/**
 * WORKAROUND: Custom base query to fix `graphql-request` crashing with `TypedDocumentString`.
 * - Our generated GraphQL queries use `TypedDocumentString`, which extends the native `String` class.
 * Because `typeof document === 'object'`, the underlying `graphql-request` library incorrectly assumes
 * it is an AST node (DocumentNode) and tries to call `.filter` on its definitions, resulting in a crash.
 * - This interceptor checks if the document is an instance of `String` and explicitly calls `.toString()`
 * to convert it into a primitive string before passing it to `graphqlRequestBaseQuery`.
 */
const customBaseQuery: typeof rawBaseQuery = async (args, api, extraOptions) => {
    if (typeof args === 'object' && args !== null && 'document' in args) {
        const doc = (args as Record<string, unknown>).document
        if (doc instanceof String) {
            return rawBaseQuery(
                {
                    ...args,
                    document: doc.toString(),
                },
                api,
                extraOptions,
            )
        }
    }

    return rawBaseQuery(args, api, extraOptions)
}

export const api = createApi({
    baseQuery: customBaseQuery,
    tagTypes: ['Forms', 'Responses'],
    endpoints: () => ({}),
})

/**
 * HACK: Overriding `api.injectEndpoints` to automatically apply tags for cache invalidation.
 *
 * WHY THIS IS NEEDED:
 * 1. Our GraphQL endpoints are auto-generated into `graphql.ts` via `graphql-codegen`.
 * 2. The generator imports this `api` object and calls `injectEndpoints` before exporting hooks.
 * 3. `api.enhanceEndpoints` (which adds tags) returns a NEW object, but the generator-exported
 *    hooks are bound to the ORIGINAL object.
 * 4. To make tags work without manually editing the generated file (which is bad practice),
 *    we intercept the `injectEndpoints` call and ensure it returns an ENHANCED version of the API.
 */
const originalInjectEndpoints = api.injectEndpoints.bind(api)

/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */
// Monkey-patching to inject tagging logic before hooks are created.
// We cast to any because we are intentionally overriding a property that TypeScript
// expects to be stable, and we're dynamically adding tag configuration that
// doesn't exist on the initial empty API.
;(api as any).injectEndpoints = (options: any) => {
    const injected = originalInjectEndpoints(
        options as Parameters<typeof originalInjectEndpoints>[0],
    )

    return (injected as any).enhanceEndpoints({
        endpoints: {
            GetAllForms: {
                providesTags: [{ type: 'Forms' as const, id: 'LIST' }],
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
                invalidatesTags: [{ type: 'Forms' as const, id: 'LIST' }],
            },
            SubmitFormResponse: {
                invalidatesTags: (_result: unknown, _error: unknown, arg: { formId: string }) => [
                    { type: 'Responses' as const, id: arg.formId },
                ],
            },
        },
    }) as ReturnType<typeof originalInjectEndpoints>
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any */
