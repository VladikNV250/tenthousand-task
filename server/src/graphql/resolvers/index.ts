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
            if (!args.title.trim()) {
                throw new Error('Form title is required')
            }

            const inputQuestions = args.questions || []
            if (inputQuestions.length === 0) {
                throw new Error('Form must have at least one question')
            }

            for (const q of inputQuestions) {
                if (!q.text.trim()) {
                    throw new Error('Question text is required')
                }
                if (q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOXES') {
                    if (!q.options || q.options.length < 2) {
                        throw new Error(
                            'Multiple choice and checkboxes must have at least 2 options',
                        )
                    }
                    if (q.options.some((opt) => !opt.trim())) {
                        throw new Error('Options cannot be empty strings')
                    }
                    if (new Set(q.options).size !== q.options.length) {
                        throw new Error('Options must be unique')
                    }
                }
            }

            const newForm = formStore.create({
                title: args.title,
                description: args.description ?? null,
                questions: args.questions ?? [],
            })

            return newForm
        },
        submitResponse: (_, args) => {
            const form = formStore.getById(args.formId)
            if (!form) {
                throw new Error(`Form not found: ${args.formId}`)
            }

            const inputAnswers = args.answers || []
            const validQuestionIds = new Set(form.questions.map((q) => q.id))
            const invalidAnswer = inputAnswers.find((a) => !validQuestionIds.has(a.questionId))
            if (invalidAnswer) {
                throw new Error(`Question does not belong to form: ${invalidAnswer.questionId}`)
            }

            const answeredQuestionIds = new Set(inputAnswers.map((a) => a.questionId))
            const missingRequiredQuestion = form.questions.find(
                (q) => q.required && !answeredQuestionIds.has(q.id),
            )
            if (missingRequiredQuestion) {
                throw new Error(
                    `Missing required answer for question: ${missingRequiredQuestion.id}`,
                )
            }

            for (const answer of inputAnswers) {
                const question = form.questions.find((q) => q.id === answer.questionId)
                if (!question) continue

                if (answer.value.length === 0 && question.required) {
                    throw new Error(`Question ${question.id} is required but no value was provided`)
                }

                if (answer.value.length === 0) continue

                const options = question.options || []
                if (question.type === 'TEXT') {
                    if (answer.value.some((v) => !v.trim())) {
                        throw new Error(`Text question ${question.id} cannot be empty`)
                    }
                } else if (question.type === 'MULTIPLE_CHOICE') {
                    if (answer.value.length !== 1) {
                        throw new Error(
                            `Multiple choice question ${question.id} must have exactly one answer`,
                        )
                    }
                    if (options.length && !options.includes(answer.value[0] ?? '')) {
                        throw new Error(
                            `Invalid option for multiple choice question ${question.id}`,
                        )
                    }
                } else if (question.type === 'CHECKBOXES') {
                    if (options.length && answer.value.some((v) => !options.includes(v))) {
                        throw new Error(`Invalid option for checkboxes question ${question.id}`)
                    }
                } else if (question.type === 'DATE') {
                    if (answer.value.length !== 1) {
                        throw new Error(`Date question ${question.id} must have exactly one answer`)
                    }
                    if (isNaN(Date.parse(answer.value[0] ?? ''))) {
                        throw new Error(`Invalid date format for question ${question.id}`)
                    }
                }
            }

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
