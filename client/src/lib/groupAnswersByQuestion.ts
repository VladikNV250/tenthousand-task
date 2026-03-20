import type { Answer, Response } from '@/services/__generated__/graphql'

export const groupAnswersByQuestion = (responses: Omit<Response, 'formId'>[]) => {
    if (responses.length === 0) return {}
    const map: Record<string, Answer[]> = {}
    responses.forEach((r) => {
        r.answers.forEach((a) => {
            if (!map[a.questionId]) map[a.questionId] = []
            map[a.questionId].push(a)
        })
    })
    return map
}
