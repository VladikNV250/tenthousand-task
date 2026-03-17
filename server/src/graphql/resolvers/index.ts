import { randomUUID } from 'node:crypto'
import type { Resolvers } from '../../generated/graphql.js'
import { formStore, responseStore } from '../../store/db.js'

export const resolvers: Resolvers = {
    Query: {
        forms: () => {
            return formStore.getAll()
        },
        form: (_, args) => {
            return formStore.getById(args.id) || null
        },
        responses: (_, args) => {
            return responseStore.getAll().filter((response) => response.formId === args.formId)
        },
    },
    Mutation: {
        createForm: (_, args) => {
            const inputQuestions = args.questions || []

            const questionsWithIds = inputQuestions.map((q) => ({
                id: randomUUID(),
                text: q.text,
                type: q.type,
                options: q.options || [],
                required: q.required,
            }))

            const newForm = formStore.create({
                title: args.title,
                description: args.description || null,
                questions: questionsWithIds,
            })

            return newForm
        },
        submitResponse: (_, args) => {
            const inputAnswers = args.answers || []

            const answersWithIds = inputAnswers.map((a) => ({
                id: randomUUID(),
                questionId: a.questionId,
                value: a.value,
            }))

            const newResponse = responseStore.create({
                formId: args.formId,
                answers: answersWithIds,
            })
            return newResponse
        },
    },
}
