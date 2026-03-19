import type { FC } from 'react'

import { cn } from '@/lib'

export interface TabType {
    id: string
    label: string
}

interface Props {
    tabs: TabType[]
    activeTab: string
    onTabChange: (id: string) => void
    className?: string
}

export const Tabs: FC<Props> = ({ tabs, activeTab, onTabChange, className }) => {
    return (
        <div
            className={cn(
                'flex items-center justify-center gap-8 w-full font-medium text-sm',
                className,
            )}
        >
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    className={cn(
                        'py-3 relative cursor-pointer outline-none transition-colors duration-200',
                        activeTab === tab.id
                            ? 'text-[#673ab7]'
                            : 'text-gray-600 hover:text-gray-800',
                    )}
                    onClick={() => onTabChange(tab.id)}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#673ab7] rounded-t-xl" />
                    )}
                </button>
            ))}
        </div>
    )
}
