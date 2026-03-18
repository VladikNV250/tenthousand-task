import { api } from '../baseApi'

export interface DocumentTypeDecoration<TResult, TVariables> {
    __apiType?: TResult & TVariables extends never ? never : any
}
export class TypedDocumentString<TResult, TVariables>
    extends String
    implements DocumentTypeDecoration<TResult, TVariables>
{
    __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType']
    constructor(
        private value: string,
        public __meta__?: Record<string, any>,
    ) {
        super(value)
    }
    toString(): string & DocumentTypeDecoration<TResult, TVariables> {
        return this.value
    }
}

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

export type Answer = {
    __typename?: 'Answer'
    id: Scalars['ID']['output']
    questionId: Scalars['ID']['output']
    value: Array<Scalars['String']['output']>
}

export type AnswerInput = {
    questionId: Scalars['ID']['input']
    value: Array<Scalars['String']['input']>
}

export type Form = {
    __typename?: 'Form'
    description?: Maybe<Scalars['String']['output']>
    id: Scalars['ID']['output']
    questions: Array<Question>
    title: Scalars['String']['output']
}

export type Mutation = {
    __typename?: 'Mutation'
    createForm?: Maybe<Form>
    submitResponse?: Maybe<Response>
}

export type MutationCreateFormArgs = {
    description?: InputMaybe<Scalars['String']['input']>
    questions?: InputMaybe<Array<QuestionInput>>
    title: Scalars['String']['input']
}

export type MutationSubmitResponseArgs = {
    answers?: InputMaybe<Array<AnswerInput>>
    formId: Scalars['ID']['input']
}

export type Query = {
    __typename?: 'Query'
    form?: Maybe<Form>
    forms: Array<Form>
    responses: Array<Response>
}

export type QueryFormArgs = {
    id: Scalars['ID']['input']
}

export type QueryResponsesArgs = {
    formId: Scalars['ID']['input']
}

export type Question = {
    __typename?: 'Question'
    id: Scalars['ID']['output']
    options?: Maybe<Array<Scalars['String']['output']>>
    required: Scalars['Boolean']['output']
    text: Scalars['String']['output']
    type: QuestionType
}

export type QuestionInput = {
    options?: InputMaybe<Array<Scalars['String']['input']>>
    required: Scalars['Boolean']['input']
    text: Scalars['String']['input']
    type: QuestionType
}

export enum QuestionType {
    Checkboxes = 'CHECKBOXES',
    Date = 'DATE',
    MultipleChoice = 'MULTIPLE_CHOICE',
    Text = 'TEXT',
}

export type Response = {
    __typename?: 'Response'
    answers: Array<Answer>
    formId: Scalars['ID']['output']
    id: Scalars['ID']['output']
}

export type GetAllFormsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllFormsQuery = {
    __typename?: 'Query'
    forms: Array<{
        __typename?: 'Form'
        id: string
        title: string
        description?: string | null
        questions: Array<{
            __typename?: 'Question'
            id: string
            text: string
            type: QuestionType
            options?: Array<string> | null
        }>
    }>
}

export type GetResponsesByFormQueryVariables = Exact<{
    formId: Scalars['ID']['input']
}>

export type GetResponsesByFormQuery = {
    __typename?: 'Query'
    responses: Array<{
        __typename?: 'Response'
        id: string
        answers: Array<{ __typename?: 'Answer'; questionId: string; value: Array<string> }>
    }>
}

export type GetFormByIdQueryVariables = Exact<{
    id: Scalars['ID']['input']
}>

export type GetFormByIdQuery = {
    __typename?: 'Query'
    form?: {
        __typename?: 'Form'
        title: string
        description?: string | null
        questions: Array<{
            __typename?: 'Question'
            id: string
            text: string
            type: QuestionType
            options?: Array<string> | null
        }>
    } | null
}

export type CreateNewFormMutationVariables = Exact<{
    title: Scalars['String']['input']
    description?: InputMaybe<Scalars['String']['input']>
    questions?: InputMaybe<Array<QuestionInput> | QuestionInput>
}>

export type CreateNewFormMutation = {
    __typename?: 'Mutation'
    createForm?: {
        __typename?: 'Form'
        id: string
        title: string
        description?: string | null
        questions: Array<{
            __typename?: 'Question'
            id: string
            text: string
            type: QuestionType
            required: boolean
            options?: Array<string> | null
        }>
    } | null
}

export type SubmitFormResponseMutationVariables = Exact<{
    formId: Scalars['ID']['input']
    answers?: InputMaybe<Array<AnswerInput> | AnswerInput>
}>

export type SubmitFormResponseMutation = {
    __typename?: 'Mutation'
    submitResponse?: {
        __typename?: 'Response'
        id: string
        formId: string
        answers: Array<{
            __typename?: 'Answer'
            id: string
            questionId: string
            value: Array<string>
        }>
    } | null
}

export const GetAllFormsDocument = new TypedDocumentString(`
    query GetAllForms {
  forms {
    id
    title
    description
    questions {
      id
      text
      type
      options
    }
  }
}
    `)
export const GetResponsesByFormDocument = new TypedDocumentString(`
    query GetResponsesByForm($formId: ID!) {
  responses(formId: $formId) {
    id
    answers {
      questionId
      value
    }
  }
}
    `)
export const GetFormByIdDocument = new TypedDocumentString(`
    query GetFormById($id: ID!) {
  form(id: $id) {
    title
    description
    questions {
      id
      text
      type
      options
    }
  }
}
    `)
export const CreateNewFormDocument = new TypedDocumentString(`
    mutation CreateNewForm($title: String!, $description: String, $questions: [QuestionInput!]) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
    description
    questions {
      id
      text
      type
      required
      options
    }
  }
}
    `)
export const SubmitFormResponseDocument = new TypedDocumentString(`
    mutation SubmitFormResponse($formId: ID!, $answers: [AnswerInput!]) {
  submitResponse(formId: $formId, answers: $answers) {
    id
    formId
    answers {
      id
      questionId
      value
    }
  }
}
    `)

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        GetAllForms: build.query<GetAllFormsQuery, GetAllFormsQueryVariables | void>({
            query: (variables) => ({ document: GetAllFormsDocument, variables }),
        }),
        GetResponsesByForm: build.query<GetResponsesByFormQuery, GetResponsesByFormQueryVariables>({
            query: (variables) => ({ document: GetResponsesByFormDocument, variables }),
        }),
        GetFormById: build.query<GetFormByIdQuery, GetFormByIdQueryVariables>({
            query: (variables) => ({ document: GetFormByIdDocument, variables }),
        }),
        CreateNewForm: build.mutation<CreateNewFormMutation, CreateNewFormMutationVariables>({
            query: (variables) => ({ document: CreateNewFormDocument, variables }),
        }),
        SubmitFormResponse: build.mutation<
            SubmitFormResponseMutation,
            SubmitFormResponseMutationVariables
        >({
            query: (variables) => ({ document: SubmitFormResponseDocument, variables }),
        }),
    }),
})

export { injectedRtkApi as api }
export const {
    useGetAllFormsQuery,
    useLazyGetAllFormsQuery,
    useGetResponsesByFormQuery,
    useLazyGetResponsesByFormQuery,
    useGetFormByIdQuery,
    useLazyGetFormByIdQuery,
    useCreateNewFormMutation,
    useSubmitFormResponseMutation,
} = injectedRtkApi
