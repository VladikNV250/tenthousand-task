import type { FC } from 'react'

import type { Answer } from '@/services/__generated__/graphql'

interface QuestionTextSummaryProps {
    answers: Answer[]
}

export const QuestionTextSummary: FC<QuestionTextSummaryProps> = ({ answers }) => {
    return (
        <div className="flex flex-col gap-3 mt-4">
            {answers.map((a) => (
                <p key={a.id} className="bg-gray-200 rounded-lg p-2 text-black">
                    {a.value.join(', ')}
                </p>
            ))}
        </div>
    )
}
