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
        <Card className="flex flex-col gap-5 p-6 border border-gray-200 shadow-sm rounded-lg focus-within:shadow-md transition-shadow">
            <h4 className="text-base text-gray-800 font-medium break-words">
                {question.text}
                {question.required && <span className="text-red-600 ml-1 text-lg">*</span>}
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
