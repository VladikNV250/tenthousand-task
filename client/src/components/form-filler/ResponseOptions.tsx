import type { FC } from 'react'

import { useAnswer } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql'

interface Props {
    question: Question
}

export const ResponseOptions: FC<Props> = ({ question }) => {
    const [answer, handleChange] = useAnswer(question.id)

    return (
        <div className="flex flex-col gap-2">
            {question.options?.map((option, index) => (
                // if use option as key it will be a problem when we have two options with the same text
                // eslint-disable-next-line react/no-array-index-key
                <label key={index} className="flex items-center gap-3 cursor-pointer py-1 group">
                    <input
                        type={question.type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                        name={question.id}
                        value={option}
                        checked={answer?.value?.includes(option) ?? false}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#673ab7] border-gray-300 focus:ring-[#673ab7] cursor-pointer"
                    />
                    <span className="text-sm text-gray-800">{option}</span>
                </label>
            ))}
        </div>
    )
}
