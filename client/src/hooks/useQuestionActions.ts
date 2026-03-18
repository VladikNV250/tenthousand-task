import type { ChangeEvent } from 'react'

import { useAppDispatch } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql-types'
import { moveQuestion, removeQuestion, updateQuestion } from '@/store/slices/formBuilderSlice'

export const useQuestionActions = (question: Question) => {
    const dispatch = useAppDispatch()

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as QuestionType

        const isOptionsRequired =
            newType === QuestionType.Checkboxes || newType === QuestionType.MultipleChoice
        const hasOptions = (question.options ?? []).length > 0

        dispatch(
            updateQuestion({
                ...question,
                type: newType,
                options: isOptionsRequired ? (hasOptions ? question.options : ['Option 1']) : [],
            }),
        )
    }

    const handleMove = (direction: 'up' | 'down') => {
        dispatch(
            moveQuestion({
                id: question.id,
                direction,
            }),
        )
    }

    const handleRemove = () => {
        dispatch(removeQuestion(question.id))
    }

    const handleRequiredToggle = (status: boolean) => {
        dispatch(updateQuestion({ ...question, required: status }))
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateQuestion({ ...question, text: e.target.value }))
    }

    return {
        handleTypeChange,
        handleMove,
        handleRemove,
        handleRequiredToggle,
        handleTitleChange,
    }
}
