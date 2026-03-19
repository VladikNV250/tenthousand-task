import type { Answer } from '@/services/__generated__/graphql'

export const groupAnswersByOption = (answers: Answer[]) => {
    const map: Record<string, number> = {}
    answers.forEach((a) => {
        a.value.forEach((v) => {
            if (!map[v]) map[v] = 0
            map[v]++
        })
    })

    return map
}
