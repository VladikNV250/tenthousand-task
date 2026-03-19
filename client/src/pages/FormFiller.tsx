import type { FC } from 'react'
import { Link } from 'react-router'

import { FormMetaCard, ResponseCard, SuccessMessage } from '@/components/form-filler'
import { Button, LoadingSpinner } from '@/components/ui'
import { useFormFiller } from '@/hooks'

const FormFiller: FC = () => {
    const { form, isLoading, handleSubmit, handleReset, isSubmitting, isSuccess } = useFormFiller()

    if (isLoading) {
        return <LoadingSpinner className="min-h-screen" text="Loading form..." />
    }

    if (!form) {
        return <p>Form not found</p>
    }

    return (
        <main className="min-h-screen w-full flex flex-col pt-16 pb-12">
            <header className="fixed z-20 top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="text-xl font-normal text-gray-700 hover:text-[#673ab7] transition-colors"
                        title="Home"
                    >
                        {form.title || 'Untitled form'}
                    </Link>
                </div>
                <Link
                    to="/"
                    className="text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md transition-colors"
                >
                    Back to forms
                </Link>
            </header>

            <div className="w-full max-w-3xl mx-auto mt-8 px-4 sm:px-6">
                {isSuccess ? (
                    <SuccessMessage onReset={handleReset} title={form.title} />
                ) : (
                    <form onSubmit={(e) => void handleSubmit(e)} className="flex flex-col gap-4">
                        <FormMetaCard title={form.title} description={form.description} />
                        {form.questions.map((question) => (
                            <ResponseCard key={question.id} question={question} />
                        ))}
                        <div className="flex items-center justify-start gap-4 mt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                            <Button
                                type="button"
                                onClick={handleReset}
                                disabled={isSubmitting}
                                variant="outline"
                            >
                                Clear form
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    )
}

export default FormFiller
