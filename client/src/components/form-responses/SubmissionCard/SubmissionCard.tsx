import type { FC } from 'react'

import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

import { Card } from '../../ui'
import { DateAnswer } from './DateAnswer'
import { NoAnswerCard } from './NoAnswerCard'
import { OptionsAnswer } from './OptionsAnswer'
import { TextAnswer } from './TextAnswer'

interface Props {
    question: Question
    answer: Answer | undefined
}

export const SubmissionCard: FC<Props> = ({ question, answer }) => {
    if (!answer) {
        return <NoAnswerCard question={question} />
    }

    return (
        <Card key={question.id} className="w-md">
            <h4 className="text-xl mb-3">{question.text}</h4>
            {question.type === QuestionType.Text && <TextAnswer answer={answer} />}
            {(question.type === QuestionType.MultipleChoice ||
                question.type === QuestionType.Checkboxes) && (
                <OptionsAnswer question={question} answer={answer} />
            )}
            {question.type === QuestionType.Date && <DateAnswer answer={answer} />}
        </Card>
    )
}
