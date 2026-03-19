import type { FC } from 'react'

import { cn } from '@/lib'

interface SwitchProps {
    id?: string
    status?: boolean
    onToggle?: (status: boolean) => void
    disabled?: boolean
    className?: string
    ariaLabel?: string
    ariaLabelledBy?: string
}

export const Switch: FC<SwitchProps> = ({
    id,
    status = false,
    onToggle,
    disabled = false,
    className,
    ariaLabel,
    ariaLabelledBy,
}) => {
    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={status}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            disabled={disabled}
            onClick={() => onToggle?.(!status)}
            className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                status ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700',
                className,
            )}
        >
            <span
                className={cn(
                    'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200',
                    status ? 'translate-x-5' : 'translate-x-1',
                )}
            />
        </button>
    )
}
