import { skipToken } from '@reduxjs/toolkit/query'
import { useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { getAnswersMap, groupAnswersByQuestion } from '@/lib'
import { useGetFormByIdQuery, useGetResponsesByFormQuery } from '@/services/__generated__/graphql'

export const useFormResponses = () => {
    const { id } = useParams()
    const [view, setView] = useState<'summary' | 'individual'>('summary')
    const [selectedResponseIndex, setSelectedResponseIndex] = useState(0)

    const { data: formData, isLoading: isFormLoading } = useGetFormByIdQuery(
        id ? { id } : skipToken,
    )
    const { data: responsesData, isLoading: isResponsesLoading } = useGetResponsesByFormQuery(
        id ? { formId: id } : skipToken,
    )

    const isLoading = isFormLoading || isResponsesLoading

    const answersByQuestionId = useMemo(
        () => groupAnswersByQuestion(responsesData?.responses ?? []),
        [responsesData],
    )

    const individualAnswersMap = useMemo(() => {
        const selectedResponse = responsesData?.responses[selectedResponseIndex]
        return getAnswersMap(selectedResponse?.answers ?? [])
    }, [responsesData, selectedResponseIndex])

    const nextResponse = () =>
        setSelectedResponseIndex((prev) =>
            Math.min(prev + 1, (responsesData?.responses.length ?? 0) - 1),
        )
    const previousResponse = () => setSelectedResponseIndex((prev) => Math.max(prev - 1, 0))
    const selectResponse = (index: number) =>
        setSelectedResponseIndex(
            Math.max(Math.min(index, (responsesData?.responses.length ?? 1) - 1), 0),
        )

    return {
        formData,
        responsesData,
        isLoading,
        view,
        setView,
        selectedResponseIndex,
        nextResponse,
        previousResponse,
        selectResponse,
        answersByQuestionId,
        individualAnswersMap,
    }
}
