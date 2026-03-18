import type { FC } from 'react'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
}

export const Button: FC<Props> = ({ children, className, ...props }) => {
    return (
        <button
            className={cn(
                'flex items-center gap-2 bg-blue-500 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-600 transition-colors',
                className,
            )}
            {...props}
        >
            {children}
        </button>
    )
}
