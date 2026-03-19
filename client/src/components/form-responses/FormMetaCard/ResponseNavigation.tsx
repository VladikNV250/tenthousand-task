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
        <div className="flex items-center gap-4">
            <button
                className="cursor-pointer disabled:opacity-50"
                disabled={isFirstResponse}
                onClick={() => onPreviousResponse()}
            >
                <ChevronLeft />
            </button>
            <input
                type="number"
                value={selectedResponseIndex + 1}
                min={1}
                max={responsesCount}
                onChange={(e) => onSelectResponse(Number(e.target.value) - 1)}
                onFocus={(e) => e.currentTarget.select()}
                className="bg-gray-100 rounded border-gray-200 text-right w-10 focus:outline-none"
            />
            of {responsesCount}
            <button
                className="cursor-pointer disabled:opacity-50"
                disabled={isLastResponse}
                onClick={() => onNextResponse()}
            >
                <ChevronRight />
            </button>
        </div>
    )
}
