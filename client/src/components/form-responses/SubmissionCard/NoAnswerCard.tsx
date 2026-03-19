import type { FC } from 'react'

import { Card } from '@/components/ui'
import type { Question } from '@/services/__generated__/graphql'

interface NoAnswerCardProps {
    question: Question
}

export const NoAnswerCard: FC<NoAnswerCardProps> = ({ question }) => {
    return (
        <Card key={question.id} className="w-full flex flex-col gap-3 p-6">
            <h4 className="text-base font-medium text-gray-800 break-words">{question.text}</h4>
            <p className="bg-gray-50 text-gray-500 italic p-3 rounded-md border border-gray-200 text-sm">
                No answer provided
            </p>
        </Card>
    )
}
