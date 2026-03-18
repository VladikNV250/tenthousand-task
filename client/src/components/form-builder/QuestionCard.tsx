import { ArrowDown, ArrowUp, Trash } from 'lucide-react'
import type { FC } from 'react'

import { useQuestionActions } from '@/hooks'
import { type Question, QuestionType } from '@/services/__generated__/graphql-types'

import { Card, Switch } from '../ui'
import { QuestionOptions } from './QuestionOptions'
import { QuestionTypePreview } from './QuestionTypePreview'

interface Props {
    question: Question
}

export const QuestionCard: FC<Props> = ({ question }) => {
    const { handleTitleChange, handleMove, handleRemove, handleRequiredToggle, handleTypeChange } =
        useQuestionActions(question)

    return (
        <Card
            key={question.id}
            className="border-t-8 border-violet-500 outline outline-gray-200 flex flex-col gap-4 "
        >
            <div>
                <input
                    aria-label="Question label"
                    type="text"
                    className="text-xl"
                    placeholder="Question text"
                    required
                    value={question.text}
                    onChange={handleTitleChange}
                />
                <select
                    aria-label="Question type"
                    onChange={handleTypeChange}
                    value={question.type}
                >
                    <option value={QuestionType.Text}>Text</option>
                    <option value={QuestionType.MultipleChoice}>Multiple Choice</option>
                    <option value={QuestionType.Checkboxes}>Checkbox</option>
                    <option value={QuestionType.Date}>Date</option>
                </select>
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
            <hr className="my-5" />
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Move question down"
                        className="cursor-pointer"
                        onClick={() => handleMove('down')}
                    >
                        <ArrowDown />
                    </button>
                    <button
                        type="button"
                        aria-label="Move question up"
                        className="cursor-pointer"
                        onClick={() => handleMove('up')}
                    >
                        <ArrowUp />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                        Required
                        <Switch status={question.required} onToggle={handleRequiredToggle} />
                    </label>
                    <button
                        type="button"
                        aria-label="Delete question"
                        className="cursor-pointer"
                        onClick={handleRemove}
                    >
                        <Trash />
                    </button>
                </div>
            </div>
        </Card>
    )
}
