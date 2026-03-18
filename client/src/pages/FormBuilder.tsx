import type { FC } from 'react'

import { FormHeader, FormMetaCard, QuestionCard } from '@/components/form-builder'
import { useFormBuilder } from '@/hooks'

const FormBuilder: FC = () => {
    const { formData, handleAddQuestion, handleSubmit, handleReset, isLoading } = useFormBuilder()

    return (
        <main className="min-h-screen min-w-screen flex flex-col gap-4 pt-20">
            <FormHeader
                onSubmit={() => void handleSubmit()}
                onAddQuestion={handleAddQuestion}
                onReset={handleReset}
                isLoading={isLoading}
            />
            <div className="flex flex-col items-center gap-4 pt-6">
                <FormMetaCard />
                {formData.questions.map((question) => (
                    <QuestionCard question={question} key={question.id} />
                ))}
            </div>
        </main>
    )
}

export default FormBuilder
