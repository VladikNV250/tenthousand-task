import type { FC } from 'react'

import { Card } from '../ui'

interface Props {
    title: string | undefined
    description: string | undefined | null
}

export const FormMetaCard: FC<Props> = ({ title, description }) => {
    return (
        <Card className="border-t-8 border-violet-500 outline outline-gray-200 flex flex-col gap-4 p-0">
            <div className="p-4 pb-0">
                <h1 className="text-3xl">{title || 'Untitled form'}</h1>
                <p>{description || ''}</p>
            </div>
            <hr className="w-full border-gray-400" />
            <p className="text-sm text-red-500 p-4 pt-0">* Indicates required question</p>
        </Card>
    )
}
