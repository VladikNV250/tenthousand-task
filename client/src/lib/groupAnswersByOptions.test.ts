import { describe, expect, it } from 'vitest'

import type { Answer } from '@/services/__generated__/graphql'

import { groupAnswersByOption } from './groupAnswersByOptions'

describe('groupAnswersByOption', () => {
    it('should count occurrences of each selected option across all answers', () => {
        const relatedAnswers: Answer[] = [
            { id: '1', questionId: 'q1', value: ['Option 1', 'Option 2'] },
            { id: '2', questionId: 'q1', value: ['Option 2'] },
            { id: '3', questionId: 'q1', value: ['Option 3', 'Option 1'] },
        ]

        const result = groupAnswersByOption(relatedAnswers)

        expect(result).toEqual({
            'Option 1': 2,
            'Option 2': 2,
            'Option 3': 1,
        })
    })

    it('should return an empty object if no answers provided', () => {
        expect(groupAnswersByOption([])).toEqual({})
    })
})
