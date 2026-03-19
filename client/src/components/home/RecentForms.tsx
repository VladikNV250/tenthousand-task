import type { FC } from 'react'

import { ErrorMessage, LoadingSpinner } from '@/components/ui'

import { FormCard } from './FormCard'

interface Props {
    forms?: { id: string; title?: string | null }[]
    isLoading: boolean
    isError: boolean
}

export const RecentForms: FC<Props> = ({ forms, isLoading, isError }) => {
    return (
        <div className="w-full bg-white flex-1 py-8 px-6">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-base font-medium text-gray-800 mb-6">Recent forms</h2>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <LoadingSpinner text="Loading forms..." />
                    </div>
                ) : isError ? (
                    <ErrorMessage message="Couldn't load forms. Please try again." />
                ) : !forms?.length ? (
                    <p className="text-gray-500 text-sm py-10 text-center">
                        No forms yet. Click "Blank" to create one.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {forms.map((form) => (
                            <FormCard key={form.id} form={form} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
