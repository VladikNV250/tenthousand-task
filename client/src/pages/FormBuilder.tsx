import type { FC } from 'react'

import { FormHeader, FormMetaCard, QuestionCard } from '@/components/form-builder'
import { ErrorMessage } from '@/components/ui'
import { useFormBuilder } from '@/hooks'
import { getRTKErrorMessage } from '@/lib'

const FormBuilder: FC = () => {
    const { formData, handleAddQuestion, handleSubmit, handleReset, isLoading, serverError } =
        useFormBuilder()

    return (
        <main className="min-h-screen w-full flex flex-col pt-16 pb-12">
            <FormHeader
                onSubmit={() => void handleSubmit()}
                onAddQuestion={handleAddQuestion}
                onReset={handleReset}
                isLoading={isLoading}
            />
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 mt-8 px-4 sm:px-6">
                {serverError && (
                    <ErrorMessage
                        className="fixed bottom-10 right-10"
                        title="Something went wrong"
                        message={getRTKErrorMessage(serverError)}
                    />
                )}

                <FormMetaCard />
                {formData.questions.map((question, index) => (
                    <QuestionCard
                        question={question}
                        key={question.id}
                        isFirst={index === 0}
                        isLast={index === formData.questions.length - 1}
                    />
                ))}
            </div>
        </main>
    )
}

export default FormBuilder
