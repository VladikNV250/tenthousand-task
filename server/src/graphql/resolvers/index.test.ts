import { describe, expect, it } from 'vitest'
import { resolvers } from './index.js'

describe('GraphQL Resolvers', () => {
    describe('createForm', () => {
        it('should create a form with valid input', () => {
            const formArgs = {
                title: 'Test Form',
                questions: [{ text: 'Q1', type: 'TEXT', required: true }],
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const createForm = (resolvers.Mutation as any).createForm
            const res = createForm(null, formArgs)

            expect(res.title).toBe('Test Form')
            expect(res.id).toBeDefined()
            expect(res.questions[0].text).toBe('Q1')
        })

        it('should throw error if form title is empty', () => {
            const formArgs = {
                title: '   ',
                questions: [{ text: 'Q1', type: 'TEXT', required: true }],
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const createForm = (resolvers.Mutation as any).createForm

            expect(() => createForm(null, formArgs)).toThrow('Form title is required')
        })

        it('should throw error if multiple choice has less than 2 options', () => {
            const formArgs = {
                title: 'Test',
                questions: [
                    { text: 'Q1', type: 'MULTIPLE_CHOICE', options: ['A'], required: true },
                ],
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const createForm = (resolvers.Mutation as any).createForm

            expect(() => createForm(null, formArgs)).toThrow(
                'Multiple choice and checkboxes must have at least 2 options',
            )
        })
    })

    describe('submitResponse', () => {
        it('should throw error if form does not exist', () => {
            const responseArgs = {
                formId: 'invalid-id',
                answers: [],
            }
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const submitResponse = (resolvers.Mutation as any).submitResponse

            expect(() => submitResponse(null, responseArgs)).toThrow('Form not found: invalid-id')
        })
    })
})
