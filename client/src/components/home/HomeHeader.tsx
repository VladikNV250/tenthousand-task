import { FileText as LucideFileText } from 'lucide-react'
import type { FC } from 'react'

export const HomeHeader: FC = () => {
    return (
        <header className="sticky top-0 z-10 w-full flex items-center px-6 py-3 bg-white border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#f0ebf8] rounded text-[#673ab7]">
                    <LucideFileText size={24} />
                </div>
                <h1 className="text-2xl font-normal text-gray-700">Forms</h1>
            </div>
        </header>
    )
}
