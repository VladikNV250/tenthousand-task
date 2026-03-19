import { skipToken } from '@reduxjs/toolkit/query'
import type { SubmitEvent } from 'react'
import { useParams } from 'react-router'

import {
    type AnswerInput,
    useGetFormByIdQuery,
    useSubmitFormResponseMutation,
} from '@/services/__generated__/graphql'
import { clearAnswers, selectFormFiller } from '@/store/slices/formFillerSlice'

import { useAppDispatch, useAppSelector } from './redux'

export const useFormFiller = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const { data, isLoading } = useGetFormByIdQuery(id ? { id } : skipToken)
    const formFiller = useAppSelector(selectFormFiller)

    const [submitFormResponse, { isLoading: isSubmitting, isSuccess, reset }] =
        useSubmitFormResponseMutation()

    const handleReset = () => {
        dispatch(clearAnswers())
        reset()
    }

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
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
    }
}
