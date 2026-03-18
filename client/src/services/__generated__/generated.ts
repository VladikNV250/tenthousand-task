import * as Types from './graphql-types'

import { TypedDocumentString } from './graphql-types'
import { api } from '@/services/baseApi'

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
    query GetFormByID($id: ID!) {
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
        GetAllForms: build.query<Types.GetAllFormsQuery, Types.GetAllFormsQueryVariables | void>({
            query: (variables) => ({ document: GetAllFormsDocument, variables }),
        }),
        GetResponsesByForm: build.query<
            Types.GetResponsesByFormQuery,
            Types.GetResponsesByFormQueryVariables
        >({
            query: (variables) => ({ document: GetResponsesByFormDocument, variables }),
        }),
        GetFormByID: build.query<Types.GetFormByIdQuery, Types.GetFormByIdQueryVariables>({
            query: (variables) => ({ document: GetFormByIdDocument, variables }),
        }),
        CreateNewForm: build.mutation<
            Types.CreateNewFormMutation,
            Types.CreateNewFormMutationVariables
        >({
            query: (variables) => ({ document: CreateNewFormDocument, variables }),
        }),
        SubmitFormResponse: build.mutation<
            Types.SubmitFormResponseMutation,
            Types.SubmitFormResponseMutationVariables
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
