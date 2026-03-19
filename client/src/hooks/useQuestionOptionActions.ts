import type { Question } from '@/services/__generated__/graphql'
import { updateQuestion } from '@/store/slices/formBuilderSlice'

import { useAppDispatch } from './redux'

export const useQuestionOptionActions = (question: Question) => {
    const dispatch = useAppDispatch()

    const addOption = () => {
        dispatch(
            updateQuestion({
                ...question,
                options: [...(question.options || []), 'Option'],
            }),
        )
    }

    const removeOption = (index: number) => {
        if (!question.options) return
        if (question.options.length === 1) return
        dispatch(
            updateQuestion({
                ...question,
                options: question.options?.filter((_, optIdx) => optIdx !== index),
            }),
        )
    }

    const editOption = (index: number, value: string) => {
        dispatch(
            updateQuestion({
                ...question,
                options: question.options?.map((opt, optIdx) => (optIdx === index ? value : opt)),
            }),
        )
    }

    return {
        addOption,
        removeOption,
        editOption,
    }
}
