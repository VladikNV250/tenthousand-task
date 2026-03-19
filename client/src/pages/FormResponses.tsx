import { type FC } from 'react'
import { Link } from 'react-router'

import { FormMetaCard, QuestionSummaryCard, SubmissionCard } from '@/components/form-responses'
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
        <main className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-4 pb-20">
            <header className="fixed py-4 px-10 top-0 left-0 w-full flex items-center justify-between bg-gray-100">
                <h1 className="text-2xl font-bold text-yellow-400">
                    {formData?.form?.title ?? 'Form responses'}
                </h1>
                <Link to="/" className="text-black underline px-4 py-2 text-lg cursor-pointer">
                    Home
                </Link>
            </header>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col items-center gap-4 pt-24">
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
