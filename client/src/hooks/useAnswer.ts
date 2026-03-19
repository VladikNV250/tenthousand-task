import type { ChangeEvent } from 'react'

import type { Question } from '@/services/__generated__/graphql'
import { addAnswer, selectAnswerByQuestionId } from '@/store/slices/formFillerSlice'

import { useAppDispatch, useAppSelector } from './redux'

export const useAnswer = (questionId: Question['id']) => {
    const dispatch = useAppDispatch()
    const answer = useAppSelector(selectAnswerByQuestionId(questionId))
    const currentValue = answer?.value ?? []

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, type, checked } = e.target
        if (type === 'checkbox') {
            const newValue = checked
                ? [...currentValue, value]
                : currentValue.filter((v) => v !== value)
            dispatch(addAnswer({ questionId, value: newValue }))
        } else {
            dispatch(addAnswer({ questionId, value: [value] }))
        }
    }

    return [answer, handleChange] as const
}
