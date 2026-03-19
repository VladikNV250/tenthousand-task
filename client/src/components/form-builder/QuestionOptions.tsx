import { X } from 'lucide-react'
import type { FC } from 'react'

import { useQuestionOptionActions } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql'

import { Input } from '../ui'

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
                    className="w-full flex items-center justify-between group mt-2"
                >
                    <div className="flex items-center gap-3 flex-1">
                        <input
                            type={type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                            disabled
                            className="w-5 h-5 text-[#673ab7] border-gray-300"
                            aria-label={`Option ${index + 1}`}
                        />
                        <Input
                            value={option}
                            onChange={(e) => editOption(index, e.target.value)}
                            className="flex-1 text-sm py-1 border-transparent hover:border-gray-300"
                            aria-label={`Edit option ${index + 1} text`}
                        />
                    </div>
                    <button
                        type="button"
                        className="cursor-pointer text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-100"
                        onClick={() => removeOption(index)}
                        aria-label="Remove option"
                        title="Remove"
                    >
                        <X size={20} />
                    </button>
                </div>
            ))}
            <div className="flex items-center gap-3 mt-2">
                <input
                    type={type === QuestionType.MultipleChoice ? 'radio' : 'checkbox'}
                    disabled
                    className="w-5 h-5 text-gray-300 border-gray-300 cursor-default"
                    aria-hidden="true"
                />
                <button
                    type="button"
                    onClick={addOption}
                    className="text-sm text-gray-500 hover:text-gray-800 hover:border-b hover:border-gray-300 py-1 transition-colors"
                >
                    Add option
                </button>
            </div>
        </>
    )
}
