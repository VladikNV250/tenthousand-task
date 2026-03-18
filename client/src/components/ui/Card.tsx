import type { FC, ReactNode } from 'react'

import { cn } from '@/lib'

interface Props {
    className?: string
    children?: ReactNode
}

export const Card: FC<Props> = ({ className, children }) => {
    return <div className={cn('bg-white rounded-lg shadow-md p-6', className)}>{children}</div>
}
