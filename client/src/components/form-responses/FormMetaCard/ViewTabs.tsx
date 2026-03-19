import type { FC } from 'react'

import { cn } from '@/lib'

interface Props {
    view: 'summary' | 'individual'
    onSetView: (view: 'summary' | 'individual') => void
}

export const ViewTabs: FC<Props> = ({ view, onSetView }) => {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                className={cn(
                    'px-4 py-2 cursor-pointer',
                    view === 'summary' && 'border-b-2 border-b-violet-500 text-violet-500',
                )}
                onClick={() => onSetView('summary')}
            >
                Summary
            </button>
            <button
                type="button"
                className={cn(
                    'px-4 py-2 cursor-pointer',
                    view === 'individual' && 'border-b-2 border-b-violet-500 text-violet-500',
                )}
                onClick={() => onSetView('individual')}
            >
                Individual
            </button>
        </div>
    )
}
