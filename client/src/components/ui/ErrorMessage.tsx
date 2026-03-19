import { AlertCircle } from 'lucide-react'
import type { FC } from 'react'

interface Props {
    title?: string
    message?: string
}

export const ErrorMessage: FC<Props> = ({
    title = 'Something went wrong',
    message = 'Please try again later',
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-10 gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto mt-10">
            <AlertCircle className="w-10 h-10 mb-2" />
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-center text-red-500">{message}</p>
        </div>
    )
}
