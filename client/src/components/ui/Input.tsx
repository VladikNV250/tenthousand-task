import type { FC, InputHTMLAttributes } from 'react'

import { cn } from '@/lib'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

export const Input: FC<Props> = ({ className, error, ...props }) => {
    return (
        <label>
            <input
                className={cn(
                    'w-full text-base py-2 px-0 bg-transparent border-b border-gray-300 focus:border-[#673ab7] focus:border-b-2 hover:bg-gray-50 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed',
                    error && 'border-red-500 focus:border-red-500',
                    className,
                )}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </label>
    )
}
