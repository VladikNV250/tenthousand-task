import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
    [_ in K]?: never
}
export type Incremental<T> =
    | T
    | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string }
    String: { input: string; output: string }
    Boolean: { input: boolean; output: boolean }
    Int: { input: number; output: number }
    Float: { input: number; output: number }
}

export type Book = {
    __typename?: 'Book'
    author?: Maybe<Scalars['String']['output']>
    title?: Maybe<Scalars['String']['output']>
}

export type Mutation = {
    __typename?: 'Mutation'
    addBook?: Maybe<Book>
}

export type MutationAddBookArgs = {
    author: Scalars['String']['input']
    title: Scalars['String']['input']
}

export type Query = {
    __typename?: 'Query'
    books?: Maybe<Array<Maybe<Book>>>
}

export type GetBooksQueryVariables = Exact<{ [key: string]: never }>

export type GetBooksQuery = {
    __typename?: 'Query'
    books?: Array<{
        __typename?: 'Book'
        title?: string | null
        author?: string | null
    } | null> | null
}

export class TypedDocumentString<TResult, TVariables>
    extends String
    implements DocumentTypeDecoration<TResult, TVariables>
{
    __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>
    private value: string
    public __meta__?: Record<string, any> | undefined

    constructor(value: string, __meta__?: Record<string, any> | undefined) {
        super(value)
        this.value = value
        this.__meta__ = __meta__
    }

    override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
        return this.value
    }
}

export const GetBooksDocument = new TypedDocumentString(`
    query GetBooks {
  books {
    title
    author
  }
}
    `) as unknown as TypedDocumentString<GetBooksQuery, GetBooksQueryVariables>
