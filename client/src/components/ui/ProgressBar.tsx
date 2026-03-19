import type { FC } from 'react'

import { cn } from '@/lib'

interface Props {
    percentage: number
    label?: string
    value?: number | string
    className?: string
}

export const ProgressBar: FC<Props> = ({ percentage, label, value, className }) => {
    return (
        <div className={cn('flex items-center gap-4 text-sm w-full', className)}>
            {label && (
                <span className="w-1/3 truncate text-gray-700" title={label}>
                    {label}
                </span>
            )}
            <div className="flex-1 bg-gray-100 rounded-full h-4 relative overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-[#673ab7] opacity-80 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {value !== undefined && <span className="text-gray-600 w-12 text-right">{value}</span>}
        </div>
    )
}
