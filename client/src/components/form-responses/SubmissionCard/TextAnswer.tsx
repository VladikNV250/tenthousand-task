import type { FC } from 'react'

import type { Answer } from '@/services/__generated__/graphql'

interface TextAnswerProps {
    answer: Answer
}

export const TextAnswer: FC<TextAnswerProps> = ({ answer }) => {
    return (
        <input
            type="text"
            value={answer.value[0]}
            disabled
            readOnly
            className="bg-gray-100 rounded-lg p-2 text-gray-500"
        />
    )
}
