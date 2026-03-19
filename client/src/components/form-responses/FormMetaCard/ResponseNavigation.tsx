import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { FC } from 'react'

interface Props {
    responsesCount: number
    selectedResponseIndex: number
    onNextResponse: () => void
    onPreviousResponse: () => void
    onSelectResponse: (index: number) => void
}

export const ResponseNavigation: FC<Props> = ({
    responsesCount,
    selectedResponseIndex,
    onNextResponse,
    onPreviousResponse,
    onSelectResponse,
}) => {
    const isFirstResponse = selectedResponseIndex === 0
    const isLastResponse = selectedResponseIndex === responsesCount - 1

    return (
        <div className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-2 rounded-md w-fit border border-gray-200">
            <button
                className="cursor-pointer p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                disabled={isFirstResponse}
                onClick={() => onPreviousResponse()}
                title="Previous response"
            >
                <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={selectedResponseIndex + 1}
                    min={1}
                    max={responsesCount}
                    onChange={(e) => onSelectResponse(Number(e.target.value) - 1)}
                    onFocus={(e) => e.currentTarget.select()}
                    className="bg-white border text-sm border-gray-300 rounded text-center w-12 py-1 focus:outline-none focus:border-[#673ab7]"
                    aria-label="Current response number"
                />
                <span>of {responsesCount}</span>
            </div>
            <button
                className="cursor-pointer p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                disabled={isLastResponse}
                onClick={() => onNextResponse()}
                title="Next response"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}
