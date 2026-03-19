import { type FC } from 'react'

import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

import { Card } from '../../ui'
import { QuestionDateSummary } from './QuestionDateSummary'
import { QuestionOptionsSummary } from './QuestionOptionsSummary'
import { QuestionTextSummary } from './QuestionTextSummary'

interface Props {
    question: Question
    answers: Answer[]
}

export const QuestionSummaryCard: FC<Props> = ({ question, answers }) => {
    return (
        <Card key={question.id} className="w-md">
            <h4 className="text-xl">{question.text}</h4>
            {question.type === QuestionType.Text && <QuestionTextSummary answers={answers} />}
            {(question.type === QuestionType.MultipleChoice ||
                question.type === QuestionType.Checkboxes) && (
                <QuestionOptionsSummary question={question} answers={answers} />
            )}
            {question.type === QuestionType.Date && <QuestionDateSummary answers={answers} />}
        </Card>
    )
}
