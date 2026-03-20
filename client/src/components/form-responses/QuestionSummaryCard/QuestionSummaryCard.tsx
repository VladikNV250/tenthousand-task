import { type FC } from 'react'

import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

import { Card } from '../../ui'
import { QuestionDateSummary } from './QuestionDateSummary'
import { QuestionOptionsSummary } from './QuestionOptionsSummary'
import { QuestionTextSummary } from './QuestionTextSummary'

interface Props {
    question: Question
    answers: Answer[]
    totalResponses: number
}

export const QuestionSummaryCard: FC<Props> = ({ question, answers, totalResponses }) => {
    return (
        <Card key={question.id} className="w-full flex-col gap-4 p-6">
            <h4 className="text-base text-gray-800 font-medium wrap-break-word mb-4">
                {question.text}
            </h4>
            {question.type === QuestionType.Text && <QuestionTextSummary answers={answers} />}
            {(question.type === QuestionType.MultipleChoice ||
                question.type === QuestionType.Checkboxes) && (
                <QuestionOptionsSummary
                    question={question}
                    answers={answers}
                    totalResponses={totalResponses}
                />
            )}
            {question.type === QuestionType.Date && <QuestionDateSummary answers={answers} />}
        </Card>
    )
}
