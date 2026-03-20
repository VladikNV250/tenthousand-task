import { describe, expect, it } from 'vitest'

import { type Form, QuestionType } from '@/services/__generated__/graphql'

import { validateSubmitResponse } from './validateSubmitResponse'

export const mockForm: Form = {
    id: 'f1',
    title: 'Test Form',
    questions: [
        { id: 'q1', text: 'Text Required', type: QuestionType.Text, required: true },
        {
            id: 'q2',
            text: 'MC Optional',
            type: QuestionType.MultipleChoice,
            options: ['A', 'B'],
            required: false,
        },
        {
            id: 'q3',
            text: 'Checkboxes Required',
            type: QuestionType.Checkboxes,
            options: ['C', 'D'],
            required: true,
        },
        { id: 'q4', text: 'Date Required', type: QuestionType.Date, required: true },
    ],
}

describe('validateSubmitResponse', () => {
    it('should return error if a required field is missing', () => {
        const errors = validateSubmitResponse(mockForm, {})
        expect(errors['q1']).toBe('This field is required')
        expect(errors['q3']).toBe('This field is required')
        expect(errors['q4']).toBe('This field is required')
        // q2 is optional
        expect(errors['q2']).toBeUndefined()
    })

    it('should validate Text inputs (blanks)', () => {
        const answers = {
            q1: { questionId: 'q1', value: ['   '] },
        }
        const errors = validateSubmitResponse(mockForm, answers)
        expect(errors['q1']).toBe('Answer cannot be just blanks')
    })

    it('should validate Multiple Choice inputs', () => {
        const answers = {
            q2: { questionId: 'q2', value: ['A', 'B'] }, // too many
        }
        const errors1 = validateSubmitResponse(mockForm, answers)
        expect(errors1['q2']).toBe('Please select exactly one option')

        const answers2 = {
            q2: { questionId: 'q2', value: ['Z'] }, // invalid option
        }
        const errors2 = validateSubmitResponse(mockForm, answers2)
        expect(errors2['q2']).toBe('Invalid option selected')
    })

    it('should validate Checkboxes inputs', () => {
        const answers = {
            q3: { questionId: 'q3', value: ['C', 'Z'] }, // Z is invalid
        }
        const errors = validateSubmitResponse(mockForm, answers)
        expect(errors['q3']).toBe('Invalid option selected')
    })

    it('should validate Date inputs', () => {
        const answers = {
            q4: { questionId: 'q4', value: ['invalid-date'] },
        }
        const errors = validateSubmitResponse(mockForm, answers)
        expect(errors['q4']).toBe('Invalid date format')
    })

    it('should return no errors for all valid inputs', () => {
        const answers = {
            q1: { questionId: 'q1', value: ['Valid text'] },
            q2: { questionId: 'q2', value: ['A'] },
            q3: { questionId: 'q3', value: ['C', 'D'] },
            q4: { questionId: 'q4', value: ['2023-10-10'] },
        }
        const errors = validateSubmitResponse(mockForm, answers)
        expect(Object.keys(errors)).toHaveLength(0)
    })
})
