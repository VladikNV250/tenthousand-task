import type { FC } from 'react'

import { Tabs } from '@/components/ui'

interface Props {
    view: 'summary' | 'individual'
    onSetView: (view: 'summary' | 'individual') => void
}

export const ViewTabs: FC<Props> = ({ view, onSetView }) => {
    return (
        <div className="flex border-b border-gray-200 mt-2">
            <Tabs
                tabs={[
                    { id: 'summary', label: 'Summary' },
                    { id: 'individual', label: 'Individual' },
                ]}
                activeTab={view}
                onTabChange={onSetView as (id: string) => void}
                className="w-auto gap-6"
            />
        </div>
    )
}
