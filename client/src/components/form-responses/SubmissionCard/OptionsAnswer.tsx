import type { FC } from 'react'

import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

interface OptionsAnswerProps {
    question: Question
    answer: Answer
}

export const OptionsAnswer: FC<OptionsAnswerProps> = ({ question, answer }) => {
    return (
        <div className="flex flex-col gap-2">
            {question.options?.map((option) => (
                <div key={option} className="flex items-center gap-2">
                    <input
                        id={option}
                        type={question.type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                        value={option}
                        checked={answer.value.includes(option)}
                        disabled
                        readOnly
                    />
                    <label htmlFor={option}>{option}</label>
                </div>
            ))}
        </div>
    )
}
