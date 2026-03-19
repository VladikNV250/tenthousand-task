import type { FC } from 'react'

import { Card } from '@/components/ui'

interface Props {
    onReset: () => void
    title?: string
}

export const SuccessMessage: FC<Props> = ({ onReset, title = 'Form' }) => {
    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4 mt-8 px-4 sm:px-6">
            <Card className="border-t-8 border-t-[#673ab7] p-6 sm:p-8">
                <h1 className="text-3xl font-normal text-gray-800 mb-4">{title}</h1>
                <p className="text-sm text-gray-700 mb-8">Your response has been recorded.</p>
                <button
                    onClick={onReset}
                    className="text-sm text-[`#673ab7`] hover:text-[`#5e35b1`] hover:underline font-medium cursor-pointer bg-transparent border-none p-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[`#673ab7`] focus-visible:ring-offset-2"
                >
                    Submit another response
                </button>
            </Card>
        </div>
    )
}
