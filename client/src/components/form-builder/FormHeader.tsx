import { Plus, Save, X } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router'

interface Props {
    onSubmit: () => void
    onAddQuestion: () => void
    onReset: () => void
    isLoading: boolean
}

export const FormHeader: FC<Props> = ({ onSubmit, onAddQuestion, onReset, isLoading }) => {
    return (
        <header className="fixed py-4 px-10 top-0 left-0 w-full flex items-center justify-between bg-gray-100">
            <h1 className="text-2xl font-bold text-yellow-400">Form Builder</h1>
            <Link to="/" className="text-black underline px-4 py-2 text-lg cursor-pointer">
                Home
            </Link>
            <div className="flex items-center gap-2">
                <button
                    onClick={onReset}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-violet-400 px-4 py-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                    <X />
                    Reset
                </button>
                <button
                    onClick={onSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-violet-400 px-4 py-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                    <Save />
                    Publish form
                </button>
                <button
                    onClick={onAddQuestion}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-violet-400 px-4 py-2 rounded text-white cursor-pointer disabled:opacity-50 disabled:cursor-default"
                >
                    <Plus />
                    Add question
                </button>
            </div>
        </header>
    )
}
