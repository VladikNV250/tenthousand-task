import type { FC } from 'react'

import { Button, Card } from '@/components/ui'

interface Props {
    onReset: () => void
}

export const SuccessMessage: FC<Props> = ({ onReset }) => {
    return (
        <div className="flex flex-col items-center gap-4 pt-6">
            <Card className="border-t-8 border-green-500 outline outline-gray-200 flex flex-col gap-4">
                <p className="text-green-500">Form submitted successfully</p>
                <Button onClick={() => onReset()}>Submit another response</Button>
            </Card>
        </div>
    )
}
