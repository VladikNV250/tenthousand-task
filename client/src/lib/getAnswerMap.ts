import type { Answer } from '@/services/__generated__/graphql'

export const getAnswersMap = (answers: Answer[]) => {
    const map: Record<string, Answer> = {}
    answers.forEach((a) => {
        map[a.questionId] = a
    })
    return map
}
