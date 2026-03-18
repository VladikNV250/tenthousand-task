import type { FC } from 'react'

import { useAnswer } from '@/hooks'
import type { Question } from '@/services/__generated__/graphql'

interface Props {
    question: Question
}

export const ResponseDateInput: FC<Props> = ({ question }) => {
    const [answer, handleChange] = useAnswer(question.id)

    return (
        <label className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm">Date</p>
            <input
                type="date"
                name={question.id}
                required={question.required}
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                value={answer?.value[0] ?? ''}
            />
        </label>
    )
}
