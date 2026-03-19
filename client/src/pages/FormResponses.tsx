import { type FC } from 'react'
import { Link } from 'react-router'

import { FormMetaCard, QuestionSummaryCard, SubmissionCard } from '@/components/form-responses'
import { LoadingSpinner } from '@/components/ui'
import { useFormResponses } from '@/hooks/useFormResponses'

const FormResponses: FC = () => {
    const {
        formData,
        responsesData,
        isLoading,
        view,
        setView,
        selectedResponseIndex,
        nextResponse,
        previousResponse,
        selectResponse,
        answersByQuestionId,
        individualAnswersMap,
    } = useFormResponses()

    return (
        <main className="min-h-screen w-full flex flex-col pt-16 pb-12">
            <header className="fixed z-20 top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-xl font-normal text-gray-700 hover:text-[#673ab7] transition-colors"
                        title="Home"
                    >
                        {formData?.form?.title ?? 'Form responses'}
                    </Link>
                </div>
                <Link
                    to="/"
                    className="text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md transition-colors"
                >
                    Back to forms
                </Link>
            </header>

            {isLoading ? (
                <LoadingSpinner className="mt-20" text="Loading responses..." />
            ) : (
                <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 mt-8 px-4 sm:px-6">
                    <FormMetaCard
                        responsesCount={responsesData?.responses.length ?? 0}
                        selectedResponseIndex={selectedResponseIndex}
                        nextResponse={nextResponse}
                        previousResponse={previousResponse}
                        selectResponse={selectResponse}
                        onSetView={setView}
                        view={view}
                    />
                    {view === 'summary' &&
                        formData?.form?.questions.map((question) => (
                            <QuestionSummaryCard
                                key={question.id}
                                question={question}
                                answers={answersByQuestionId[question.id] ?? []}
                                totalResponses={responsesData?.responses.length ?? 0}
                            />
                        ))}
                    {view === 'individual' &&
                        formData?.form?.questions.map((question) => {
                            return (
                                <SubmissionCard
                                    key={question.id}
                                    question={question}
                                    answer={individualAnswersMap[question.id]}
                                />
                            )
                        })}
                </div>
            )}
        </main>
    )
}

export default FormResponses
