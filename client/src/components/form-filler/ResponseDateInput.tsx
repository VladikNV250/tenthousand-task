import type { FC } from 'react'

import { Input } from '@/components/ui'
// Keep the rest of the lines
import { useAnswer } from '@/hooks'
import type { Question } from '@/services/__generated__/graphql'

interface Props {
    question: Question
}

export const ResponseDateInput: FC<Props> = ({ question }) => {
    const [answer, handleChange] = useAnswer(question.id)

    return (
        <label htmlFor={`date-${question.id}`} className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm">Date</p>
            <Input
                type="date"
                id={`date-${question.id}`}
                aria-label={question.text}
                name={question.id}
                required={question.required}
                className="w-full max-w-[200px]"
                onChange={handleChange}
                value={answer?.value[0] ?? ''}
            />
        </label>
    )
}
