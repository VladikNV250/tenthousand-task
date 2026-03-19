import { type FC, useMemo } from 'react'

import { ProgressBar } from '@/components/ui'
import { groupAnswersByOption } from '@/lib'
import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

interface QuestionOptionsSummaryProps {
    question: Question
    answers: Answer[]
    totalResponses: number
}

export const QuestionOptionsSummary: FC<QuestionOptionsSummaryProps> = ({
    question,
    answers,
    totalResponses,
}) => {
    const answersByOption = useMemo(() => groupAnswersByOption(answers), [answers])

    return (
        <div className="flex flex-col gap-3 mt-4">
            {question.options?.map((option) => {
                const count = answersByOption[option] ?? 0
                const progress = totalResponses > 0 ? (count / totalResponses) * 100 : 0
                return (
                    <ProgressBar
                        key={option}
                        label={option}
                        value={
                            question.type === QuestionType.Checkboxes
                                ? `${count}/${totalResponses}`
                                : `${progress.toFixed(1)}%`
                        }
                        percentage={progress}
                        className="mb-1"
                    />
                )
            })}
        </div>
    )
}
