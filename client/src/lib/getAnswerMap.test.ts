import { describe, expect, it } from 'vitest'

import type { Answer } from '@/services/__generated__/graphql'

import { getAnswersMap } from './getAnswerMap'

describe('getAnswersMap', () => {
    it('should transform an array of answers into a map keyed by questionId', () => {
        const answers: Answer[] = [
            { id: '1', questionId: 'q1', value: ['Yes'] },
            { id: '2', questionId: 'q2', value: ['No', 'Maybe'] },
        ]

        const result = getAnswersMap(answers)

        expect(result).toEqual({
            q1: { id: '1', questionId: 'q1', value: ['Yes'] },
            q2: { id: '2', questionId: 'q2', value: ['No', 'Maybe'] },
        })
    })

    it('should return an empty object for an empty array', () => {
        const result = getAnswersMap([])
        expect(result).toEqual({})
    })
})
