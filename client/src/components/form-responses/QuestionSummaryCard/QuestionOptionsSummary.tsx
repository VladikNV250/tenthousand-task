import { type FC, useMemo } from 'react'

import { groupAnswersByOption } from '@/lib'
import { type Answer, type Question, QuestionType } from '@/services/__generated__/graphql'

interface QuestionOptionsSummaryProps {
    question: Question
    answers: Answer[]
}

export const QuestionOptionsSummary: FC<QuestionOptionsSummaryProps> = ({ question, answers }) => {
    const answersByOption = useMemo(() => groupAnswersByOption(answers), [answers])

    return (
        <div className="flex flex-col gap-3 mt-4">
            {question.options?.map((option) => {
                const progress = (answersByOption[option] / answers.length) * 100
                return (
                    <div key={option} className="flex flex-col items-center gap-2">
                        <div className="w-full flex items-center justify-between gap-2">
                            <p className=" text-black">{option}</p>
                            <p className=" text-black">
                                {question.type === QuestionType.Checkboxes
                                    ? `${answersByOption[option]}/${answers.length}`
                                    : `${progress.toFixed(2)}%`}
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-lg h-2">
                            <div
                                className="bg-violet-500 h-2 rounded-lg"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
