import { describe, expect, it } from 'vitest'

import { type Question, QuestionType } from '@/services/__generated__/graphql'

import { validateCreateNewForm } from './validateCreateNewForm'

describe('validateCreateNewForm', () => {
    it('should return error if title is empty', () => {
        const errors = validateCreateNewForm('   ', [
            { id: '1', text: 'Q1', type: QuestionType.Text, required: false },
        ] as Question[])

        expect(errors.title).toBe('Form title is required')
    })

    it('should return error if there are no questions', () => {
        const errors = validateCreateNewForm('Valid Title', [])

        expect(errors.questions?.form).toBe('Form must have at least one question')
    })

    it('should validate empty question text', () => {
        const questions = [
            { id: '1', text: '   ', type: QuestionType.Text, required: false },
        ] as Question[]
        const errors = validateCreateNewForm('Title', questions)

        expect(errors.questions?.['1']).toBe('Question text cannot be empty')
    })

    describe('Multiple Choice / Checkboxes', () => {
        it('should require at least 2 options', () => {
            const questions = [
                {
                    id: '1',
                    text: 'Valid Q',
                    type: QuestionType.MultipleChoice,
                    options: ['A'],
                    required: false,
                },
                {
                    id: '2',
                    text: 'Valid Q2',
                    type: QuestionType.Checkboxes,
                    options: [],
                    required: false,
                },
            ] as Question[]

            const errors = validateCreateNewForm('Title', questions)

            expect(errors.questions?.['1']).toBe('Must have at least 2 options')
            expect(errors.questions?.['2']).toBe('Must have at least 2 options')
        })

        it('should not allow empty string options', () => {
            const questions = [
                {
                    id: '1',
                    text: 'Valid Q',
                    type: QuestionType.MultipleChoice,
                    options: ['A', '   '],
                    required: false,
                },
            ] as Question[]

            const errors = validateCreateNewForm('Title', questions)

            expect(errors.questions?.['1']).toBe('Options cannot be empty strings')
        })

        it('should require unique options', () => {
            const questions = [
                {
                    id: '1',
                    text: 'Valid Q',
                    type: QuestionType.MultipleChoice,
                    options: ['A', 'A'],
                    required: false,
                },
            ] as Question[]

            const errors = validateCreateNewForm('Title', questions)

            expect(errors.questions?.['1']).toBe('Options must be unique')
        })
    })

    it('should return no errors for a valid form', () => {
        const questions = [
            { id: '1', text: 'Name', type: QuestionType.Text, required: true },
            {
                id: '2',
                text: 'Option',
                type: QuestionType.MultipleChoice,
                options: ['1', '2'],
                required: false,
            },
        ] as Question[]

        const errors = validateCreateNewForm('Valid Form', questions)

        expect(errors.title).toBeUndefined()
        expect(errors.questions).toBeUndefined()
    })
})
