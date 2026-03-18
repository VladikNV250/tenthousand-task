import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router'

import { useCreateNewFormMutation } from '@/services/__generated__/generated'
import { QuestionType } from '@/services/__generated__/graphql-types'
import { addQuestion, resetForm, selectFormBuilder } from '@/store/slices/formBuilderSlice'

import { useAppDispatch, useAppSelector } from './redux'

export const useFormBuilder = () => {
    const dispatch = useAppDispatch()
    const formData = useAppSelector(selectFormBuilder)
    const navigate = useNavigate()

    const handleAddQuestion = () => {
        dispatch(
            addQuestion({
                id: nanoid(),
                text: 'Question',
                type: QuestionType.Text,
                required: false,
                options: [],
            }),
        )
    }

    const [createNewForm, { isLoading }] = useCreateNewFormMutation()

    const handleSubmit = async () => {
        try {
            await createNewForm({
                title: formData.title,
                description: formData.description,
                questions: formData.questions.map((question) => ({
                    text: question.text,
                    type: question.type,
                    required: question.required,
                    options: question.options,
                })),
            }).unwrap()
            dispatch(resetForm())
            await navigate('/')
        } catch (e) {
            console.error('Failed to create form:', e)
            // TODO: Add user-facing error notification (toast, alert, etc.)
            // Example: dispatch(showError('Failed to create form. Please try again.'))
        }
    }

    const handleReset = () => {
        dispatch(resetForm())
    }

    return {
        formData,
        handleAddQuestion,
        handleSubmit,
        handleReset,
        isLoading,
    }
}
