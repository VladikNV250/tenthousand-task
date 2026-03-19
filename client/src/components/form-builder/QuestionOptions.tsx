import { X } from 'lucide-react'
import type { FC } from 'react'

import { useQuestionOptionActions } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql'

interface Props {
    type: QuestionType.MultipleChoice | QuestionType.Checkboxes
    question: Question
}

export const QuestionOptions: FC<Props> = ({ type, question }) => {
    const { addOption, editOption, removeOption } = useQuestionOptionActions(question)

    return (
        <>
            {question.options?.map((option, index) => (
                <div
                    // if use option as key it will be a problem when we have two options with the same text
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className="w-full flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type={type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                            value={option}
                            readOnly
                            name={question.id}
                            aria-label={`Option ${index + 1}`}
                        />
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => editOption(index, e.target.value)}
                            aria-label={`Edit option ${index + 1} text`}
                        />
                    </div>
                    <button className="cursor-pointer" onClick={() => removeOption(index)}>
                        <X />
                    </button>
                </div>
            ))}
            <div className="flex items-center gap-2">
                <input
                    type={type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                    value=""
                    readOnly
                    checked={false}
                    aria-hidden="true"
                />
                <button type="button" onClick={addOption}>
                    Add option
                </button>
            </div>
        </>
    )
}
