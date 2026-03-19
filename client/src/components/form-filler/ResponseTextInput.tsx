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
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleChange}
            value={answer?.value[0] ?? ''}
        />
    )
}
