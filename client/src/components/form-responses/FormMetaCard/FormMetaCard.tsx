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
        <Card className="flex flex-col gap-6 w-full border-t-8 border-t-[#673ab7] rounded-t-lg p-8!">
            <h2 className="text-3xl font-normal text-gray-800">{responsesCount} responses</h2>
            <ViewTabs view={view} onSetView={onSetView} />
            {view === 'individual' && responsesCount > 0 && (
                <div className="pt-2">
                    <ResponseNavigation
                        responsesCount={responsesCount}
                        selectedResponseIndex={selectedResponseIndex}
                        onNextResponse={nextResponse}
                        onPreviousResponse={previousResponse}
                        onSelectResponse={selectResponse}
                    />
                </div>
            )}
        </Card>
    )
}
