import type { FC } from 'react'

import type { Answer } from '@/services/__generated__/graphql'

interface DateAnswerProps {
    answer: Answer
}

export const DateAnswer: FC<DateAnswerProps> = ({ answer }) => {
    return (
        <input
            type="date"
            value={answer.value[0] ?? ''}
            disabled
            readOnly
            className="bg-gray-100 rounded-lg p-2 text-gray-500"
        />
    )
}
