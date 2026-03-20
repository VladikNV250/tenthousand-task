import type { ButtonHTMLAttributes, FC, ReactNode } from 'react'

import { cn } from '@/lib'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'outline' | 'ghost' | 'danger'
    size?: 'sm' | 'md' | 'lg'
}

export const Button: FC<Props> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    ...props
}) => {
    const baseStyles =
        'flex items-center justify-center gap-2 rounded font-medium transition-colors focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-[#673ab7] text-white hover:bg-[#5e35b1] focus:ring-[#673ab7]',
        outline:
            'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-300',
        danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50 focus:ring-red-500',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-2 text-base',
        lg: 'px-8 py-3 text-lg',
    }

    return (
        <button className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
            {children}
        </button>
    )
}
