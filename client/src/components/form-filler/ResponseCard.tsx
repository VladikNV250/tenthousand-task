import type { FC } from 'react'

import { type Question, QuestionType } from '@/services/__generated__/graphql'

import { Card } from '../ui'
import { ResponseDateInput } from './ResponseDateInput'
import { ResponseOptions } from './ResponseOptions'
import { ResponseTextInput } from './ResponseTextInput'

interface Props {
    question: Question
}

export const ResponseCard: FC<Props> = ({ question }) => {
    return (
        <Card className="border-t-8 border-violet-500 outline outline-gray-200 flex flex-col gap-4 ">
            <h4 className="text-xl">
                {question.text}
                {question.required && <span className="text-red-500">*</span>}
            </h4>
            {(question.type === QuestionType.MultipleChoice ||
                question.type === QuestionType.Checkboxes) && (
                <ResponseOptions question={question} />
            )}
            {question.type === QuestionType.Text && <ResponseTextInput question={question} />}
            {question.type === QuestionType.Date && <ResponseDateInput question={question} />}
        </Card>
    )
}
