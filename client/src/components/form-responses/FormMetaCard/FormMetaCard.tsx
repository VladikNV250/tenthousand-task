import { type FC } from 'react'

import { Card } from '../../ui'
import { ResponseNavigation } from './ResponseNavigation'
import { ViewTabs } from './ViewTabs'

interface Props {
    responsesCount: number
    selectedResponseIndex: number
    nextResponse: () => void
    previousResponse: () => void
    selectResponse: (index: number) => void
    onSetView: (view: 'summary' | 'individual') => void
    view: 'summary' | 'individual'
}

export const FormMetaCard: FC<Props> = ({
    responsesCount,
    selectedResponseIndex,
    nextResponse,
    previousResponse,
    selectResponse,
    onSetView,
    view,
}) => {
    return (
        <Card className="flex flex-col gap-8 w-md">
            <h2 className="text-2xl font-bold">{responsesCount} responses</h2>
            <ViewTabs view={view} onSetView={onSetView} />
            {view === 'individual' && responsesCount > 0 && (
                <ResponseNavigation
                    responsesCount={responsesCount}
                    selectedResponseIndex={selectedResponseIndex}
                    onNextResponse={nextResponse}
                    onPreviousResponse={previousResponse}
                    onSelectResponse={selectResponse}
                />
            )}
        </Card>
    )
}
