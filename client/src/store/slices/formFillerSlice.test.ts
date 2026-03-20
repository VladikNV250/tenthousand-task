import { describe, expect, it } from 'vitest'

import formFillerReducer, { addAnswer, clearAnswers, setShowErrors } from './formFillerSlice'

describe('formFillerSlice', () => {
    const initialState = {
        answers: {},
        showErrors: false,
    }

    it('should handle initial state', () => {
        expect(formFillerReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })

    it('should handle addAnswer', () => {
        const answer = { questionId: 'q1', value: ['A'] }
        const state = formFillerReducer(initialState, addAnswer(answer))
        expect(state.answers.q1).toEqual(answer)

        // overwrite existing
        const newAnswer = { questionId: 'q1', value: ['B'] }
        const state2 = formFillerReducer(state, addAnswer(newAnswer))
        expect(state2.answers.q1).toEqual(newAnswer)
    })

    it('should handle clearAnswers', () => {
        const startingState = {
            answers: { q1: { questionId: 'q1', value: ['A'] } },
            showErrors: true, // Should not modify showErrors
        }
        const state = formFillerReducer(startingState, clearAnswers())
        expect(state.answers).toEqual({})
        expect(state.showErrors).toBe(true)
    })

    it('should handle setShowErrors', () => {
        const state = formFillerReducer(initialState, setShowErrors(true))
        expect(state.showErrors).toBe(true)
    })
})
