import type { FC } from 'react'

import { useAnswer } from '@/hooks'
import type { Question } from '@/services/__generated__/graphql'

interface Props {
    question: Question
}

export const ResponseTextInput: FC<Props> = ({ question }) => {
    const [answer, handleChange] = useAnswer(question.id)

    return (
        <input
            type="text"
            name={question.id}
            required={question.required}
            aria-label={question.text}
            placeholder="Your answer"
            className="w-full sm:w-1/2 text-sm text-gray-800 border-b border-gray-300 focus:border-[#673ab7] focus:border-b-2 bg-transparent hover:bg-gray-50 transition-colors py-2 outline-none"
            onChange={handleChange}
            value={answer?.value[0] ?? ''}
        />
    )
}
