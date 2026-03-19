import { Loader2 } from 'lucide-react'
import type { FC } from 'react'

import { cn } from '@/lib'

interface Props {
    className?: string
    text?: string
}

export const LoadingSpinner: FC<Props> = ({ className, text = 'Loading...' }) => {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center p-10 gap-3 text-gray-500',
                className,
            )}
        >
            <Loader2 className="w-8 h-8 animate-spin text-[#673ab7]" />
            <p className="text-sm font-medium">{text}</p>
        </div>
    )
}
