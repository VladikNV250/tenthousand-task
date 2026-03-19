import { AlertCircle } from 'lucide-react'
import type { FC } from 'react'

import { cn } from '@/lib'

interface Props {
    title?: string
    message?: string | null
    className?: string
}

export const ErrorMessage: FC<Props> = ({
    title = 'Something went wrong',
    message = 'Please try again later',
    className,
}) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center p-10 gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto mt-10',
                className,
            )}
        >
            <AlertCircle className="w-10 h-10 mb-2" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-center text-red-500">{message}</p>
        </div>
    )
}
