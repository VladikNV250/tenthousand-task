import type { FC } from 'react'

import type { Answer } from '@/services/__generated__/graphql'

interface QuestionDateSummaryProps {
    answers: Answer[]
}

export const QuestionDateSummary: FC<QuestionDateSummaryProps> = ({ answers }) => {
    return (
        <div className="flex flex-wrap gap-3 mt-4">
            {answers.map((a) => (
                <p key={a.id} className="bg-gray-200 rounded-lg p-2 text-black">
                    {a.value.join(', ')}
                </p>
            ))}
        </div>
    )
}
