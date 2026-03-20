import { describe, expect, it } from 'vitest'

import { groupAnswersByQuestion } from './groupAnswersByQuestion'

describe('groupAnswersByQuestion', () => {
    it('should group answers by their questionId across all responses', () => {
        const allResponses = [
            {
                id: 'r1',
                answers: [{ id: '1', questionId: 'q1', value: ['A'] }],
            },
            {
                id: 'r2',
                answers: [
                    { id: '2', questionId: 'q2', value: ['B'] },
                    { id: '3', questionId: 'q1', value: ['C'] },
                ],
            },
        ]

        const result = groupAnswersByQuestion(allResponses)

        expect(result).toEqual({
            q1: [
                { id: '1', questionId: 'q1', value: ['A'] },
                { id: '3', questionId: 'q1', value: ['C'] },
            ],
            q2: [{ id: '2', questionId: 'q2', value: ['B'] }],
        })
    })

    it('should return empty map for empty responses', () => {
        expect(groupAnswersByQuestion([])).toEqual({})
    })
})
