import { skipToken } from '@reduxjs/toolkit/query'
import type { SubmitEvent } from 'react'
import { useParams } from 'react-router'

import { validateSubmitResponse } from '@/lib'
import {
    type AnswerInput,
    type Form,
    useGetFormByIdQuery,
    useSubmitFormResponseMutation,
} from '@/services/__generated__/graphql'
import { clearAnswers, selectFormFiller, setShowErrors } from '@/store/slices/formFillerSlice'

import { useAppDispatch, useAppSelector } from './redux'

export const useFormFiller = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { data, isLoading } = useGetFormByIdQuery(id ? { id } : skipToken)
    const formFiller = useAppSelector(selectFormFiller)

    const [submitFormResponse, { isLoading: isSubmitting, isSuccess, reset, error: serverError }] =
        useSubmitFormResponseMutation()

    const validationErrors = data?.form
        ? validateSubmitResponse(data.form as Form, formFiller.answers)
        : {}
    const hasValidationErrors = Object.keys(validationErrors).length > 0

    const handleReset = () => {
        dispatch(clearAnswers())
        dispatch(setShowErrors(false))
        reset()
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (hasValidationErrors) {
            dispatch(setShowErrors(true))
            return
        }
        try {
            if (!id) {
                throw new Error('Form ID is not defined')
            }
            await submitFormResponse({
                formId: id,
                answers: Object.values(formFiller.answers).filter(
                    (answer): answer is AnswerInput => answer !== undefined,
                ),
            }).unwrap()
            dispatch(clearAnswers())
            dispatch(setShowErrors(false))
        } catch (e) {
            console.error(e)
            // TODO: Add user-facing error notification (toast, alert, etc.)
            // Example: dispatch(showError('Failed to submit form. Please try again.'))
        }
    }

    return {
        form: data?.form,
        isLoading,
        formFiller,
        handleSubmit,
        handleReset,
        isSubmitting,
        isSuccess,
        serverError,
        validationErrors,
    }
}
