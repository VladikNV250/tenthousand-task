import type { FC } from 'react'

import { Card } from '../ui'

interface Props {
    title: string | undefined
    description: string | undefined | null
}

export const FormMetaCard: FC<Props> = ({ title, description }) => {
    return (
        <Card className="border-t-8 border-t-[#673ab7] rounded-t-lg flex flex-col gap-4 p-8!">
            <div className="pb-0">
                <h1 className="text-4xl text-gray-900 mb-2">{title || 'Untitled form'}</h1>
                <p className="text-gray-700">{description || ''}</p>
            </div>
            <hr className="w-full border-gray-200 mt-2" />
            <p className="text-sm text-red-600 pt-0">* Indicates required question</p>
        </Card>
    )
}
