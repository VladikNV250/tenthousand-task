import type { FC } from 'react'

import { Card } from '@/components/ui'
import type { Question } from '@/services/__generated__/graphql'

interface NoAnswerCardProps {
    question: Question
}

export const NoAnswerCard: FC<NoAnswerCardProps> = ({ question }) => {
    return (
        <Card key={question.id} className="w-md">
            <h4 className="text-xl">{question.text}</h4>
            <p className="bg-gray-200 rounded-lg p-2 text-black">No answer</p>
        </Card>
    )
}
