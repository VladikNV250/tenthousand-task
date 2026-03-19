import { describe, expect, it } from 'vitest'

import { QuestionType, type Question } from '@/services/__generated__/graphql'

import formBuilderReducer, {
    addQuestion,
    moveQuestion,
    removeQuestion,
    resetForm,
    setShowErrors,
    updateDescription,
    updateTitle,
} from './formBuilderSlice'

describe('formBuilderSlice', () => {
    const initialState = {
        title: 'Untitled form',
        description: '',
        questions: [],
        showErrors: false,
    }

    it('should handle initial state', () => {
        expect(formBuilderReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle addQuestion', () => {
        const question: Question = { id: '1', text: 'Q1', type: QuestionType.Text, required: true }
        const state = formBuilderReducer(initialState, addQuestion(question))
        expect(state.questions).toHaveLength(1)
        expect(state.questions[0]).toEqual(question)
    })

    it('should handle removeQuestion', () => {
        const question: Question = { id: '1', text: 'Q1', type: QuestionType.Text, required: true }
        const startingState = { ...initialState, questions: [question] }
        const state = formBuilderReducer(startingState, removeQuestion('1'))
        expect(state.questions).toHaveLength(0)
    })

    it('should handle moveQuestion boundaries and swaps', () => {
        const q1: Question = { id: '1', text: 'Q1', type: QuestionType.Text, required: false }
        const q2: Question = { id: '2', text: 'Q2', type: QuestionType.Text, required: false }
        const q3: Question = { id: '3', text: 'Q3', type: QuestionType.Text, required: false }
        const startingState = { ...initialState, questions: [q1, q2, q3] }

        // Move q2 up -> [q2, q1, q3]
        const state1 = formBuilderReducer(startingState, moveQuestion({ id: '2', direction: 'up' }))
        expect(state1.questions.map((q) => q.id)).toEqual(['2', '1', '3'])

        // Move q2 down (from startingState) -> [q1, q3, q2]
        const state2 = formBuilderReducer(
            startingState,
            moveQuestion({ id: '2', direction: 'down' }),
        )
        expect(state2.questions.map((q) => q.id)).toEqual(['1', '3', '2'])

        // Move q1 up (out of bounds) -> no change
        const state3 = formBuilderReducer(startingState, moveQuestion({ id: '1', direction: 'up' }))
        expect(state3.questions.map((q) => q.id)).toEqual(['1', '2', '3'])
    })

    it('should handle scalar property updates', () => {
        let state = formBuilderReducer(initialState, updateTitle('New Title'))
        state = formBuilderReducer(state, updateDescription('Desc'))
        state = formBuilderReducer(state, setShowErrors(true))

        expect(state.title).toBe('New Title')
        expect(state.description).toBe('Desc')
        expect(state.showErrors).toBe(true)
    })

    it('should handle resetForm', () => {
        const modifiedState = {
            title: 'Modified',
            description: 'Modified',
            questions: [{ id: '1', text: 'Q', type: QuestionType.Text, required: false }],
            showErrors: true,
        }
        const state = formBuilderReducer(modifiedState, resetForm())
        expect(state).toEqual(initialState)
    })
})
