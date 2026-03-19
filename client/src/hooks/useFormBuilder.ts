import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router'

import { validateCreateNewForm } from '@/lib'
import { QuestionType, useCreateNewFormMutation } from '@/services/__generated__/graphql'
import {
    addQuestion,
    resetForm,
    selectFormBuilder,
    setShowErrors,
} from '@/store/slices/formBuilderSlice'

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

    const [createNewForm, { isLoading, error: serverError }] = useCreateNewFormMutation()

    const validationErrors = validateCreateNewForm(formData.title, formData.questions)
    const hasValidationErrors = Object.keys(validationErrors).length > 0

    const handleSubmit = async () => {
        if (hasValidationErrors) {
            dispatch(setShowErrors(true))
            return
        }

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
            dispatch(setShowErrors(false))
            await navigate('/')
        } catch (e) {
            console.error('Failed to create form:', e)
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
        serverError,
    }
}
