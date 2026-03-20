import { ArrowDown, ArrowUp, Trash } from 'lucide-react'
import type { FC } from 'react'

import { useAppSelector, useQuestionActions } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql'
import { selectFormBuilder, selectFormBuilderErrors } from '@/store/slices/formBuilderSlice'

import { Card, Input, Select, Switch } from '../ui'
import { QuestionOptions } from './QuestionOptions'
import { QuestionTypePreview } from './QuestionTypePreview'

interface Props {
    question: Question
    isFirst?: boolean
    isLast?: boolean
}

export const QuestionCard: FC<Props> = ({ question, isFirst, isLast }) => {
    const { handleTitleChange, handleMove, handleRemove, handleRequiredToggle, handleTypeChange } =
        useQuestionActions(question)

    const { showErrors } = useAppSelector(selectFormBuilder)
    const errors = useAppSelector(selectFormBuilderErrors)

    return (
        <Card className="flex flex-col gap-4 focus-within:shadow-md focus-within:border-l-4 focus-within:border-l-blue-500 transition-all duration-200">
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    aria-label="Question label"
                    className="flex-1 p-3 bg-gray-50 text-base"
                    placeholder="Question"
                    required
                    value={question.text}
                    onChange={handleTitleChange}
                    error={showErrors ? errors.questions?.[question.id] : undefined}
                />
                <Select
                    aria-label="Question type"
                    onChange={handleTypeChange}
                    value={question.type}
                    options={[
                        { label: 'Short answer', value: QuestionType.Text },
                        { label: 'Multiple choice', value: QuestionType.MultipleChoice },
                        { label: 'Checkboxes', value: QuestionType.Checkboxes },
                        { label: 'Date', value: QuestionType.Date },
                    ]}
                />
            </div>

            {question.type === QuestionType.Text && (
                <QuestionTypePreview type={QuestionType.Text} />
            )}
            {question.type === QuestionType.MultipleChoice && (
                <QuestionOptions type={QuestionType.MultipleChoice} question={question} />
            )}
            {question.type === QuestionType.Checkboxes && (
                <QuestionOptions type={QuestionType.Checkboxes} question={question} />
            )}
            {question.type === QuestionType.Date && (
                <QuestionTypePreview type={QuestionType.Date} />
            )}
            <hr className="my-2 border-gray-200" />
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Move question down"
                        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full cursor-pointer transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        onClick={() => handleMove('down')}
                        title="Move down"
                        disabled={isLast}
                    >
                        <ArrowDown size={20} />
                    </button>
                    <button
                        type="button"
                        aria-label="Move question up"
                        className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full cursor-pointer transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                        onClick={() => handleMove('up')}
                        title="Move up"
                        disabled={isFirst}
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Delete question"
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
                        onClick={handleRemove}
                        title="Delete"
                    >
                        <Trash size={20} />
                    </button>
                    <div className="w-px h-8 bg-gray-300 mx-2" />
                    <label
                        className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                        htmlFor={`required-switch-${question.id}`}
                    >
                        Required
                        <Switch
                            id={`required-switch-${question.id}`}
                            status={question.required}
                            onToggle={handleRequiredToggle}
                        />
                    </label>
                </div>
            </div>
        </Card>
    )
}
