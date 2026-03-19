import { FileText, Plus, Save } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router'

import { Button } from '@/components/ui'

interface Props {
    onSubmit: () => void
    onAddQuestion: () => void
    onReset: () => void
    isLoading: boolean
}

export const FormHeader: FC<Props> = ({ onSubmit, onAddQuestion, onReset, isLoading }) => {
    return (
        <header className="fixed z-20 top-0 left-0 w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <Link
                    to="/"
                    className="p-2 bg-[#f0ebf8] rounded text-[#673ab7] hover:bg-violet-100 transition-colors"
                    title="Home"
                    aria-label="Home"
                >
                    <FileText size={24} aria-hidden />
                </Link>
                <div className="text-xl text-gray-700">Form Builder</div>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    aria-label="Clear content"
                    onClick={onReset}
                    disabled={isLoading}
                    variant="ghost"
                    title="Clear content"
                >
                    Clear
                </Button>
                <Button
                    aria-label="Add question"
                    onClick={onAddQuestion}
                    disabled={isLoading}
                    variant="outline"
                >
                    <Plus size={16} aria-hidden />
                    <span className="hidden sm:inline">Add Question</span>
                </Button>
                <Button aria-label="Save form" onClick={onSubmit} disabled={isLoading}>
                    <Save size={16} className="mr-1" aria-hidden />
                    Send
                </Button>
            </div>
        </header>
    )
}
