import type { FC } from 'react'
import { Link } from 'react-router'

import { FormMetaCard, ResponseCard, SuccessMessage } from '@/components/form-filler'
import { Button } from '@/components/ui'
import { useFormFiller } from '@/hooks'

const FormFiller: FC = () => {
    const { form, isLoading, handleSubmit, handleReset, isSubmitting, isSuccess } = useFormFiller()

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!form) {
        return <p>Form not found</p>
    }

    return (
        <main className="min-h-screen min-w-screen flex flex-col gap-4 pt-20">
            <header className="fixed py-4 px-10 top-0 left-0 w-full flex items-center justify-between bg-gray-100">
                <Link to="/" className="text-black underline px-4 py-2 text-lg cursor-pointer">
                    Home
                </Link>
            </header>
            {isSuccess ? (
                <SuccessMessage onReset={handleReset} />
            ) : (
                <form
                    onSubmit={(e) => void handleSubmit(e)}
                    className="flex flex-col items-center gap-4 pt-6"
                >
                    <FormMetaCard title={form.title} description={form.description} />
                    {form.questions.map((question) => (
                        <ResponseCard key={question.id} question={question} />
                    ))}
                    <div className="flex items-center justify-between gap-4">
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <Button type="reset" onClick={handleReset} disabled={isSubmitting}>
                            Reset
                        </Button>
                    </div>
                </form>
            )}
        </main>
    )
}

export default FormFiller
