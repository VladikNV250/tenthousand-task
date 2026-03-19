import { FileText } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router'

interface FormCardProps {
    form: { id: string; title?: string | null }
}

export const FormCard: FC<FormCardProps> = ({ form }) => {
    return (
        <div className="group flex flex-col bg-white rounded-md border border-gray-200 hover:border-[#673ab7] transition-colors overflow-hidden">
            <Link
                to={`/forms/${form.id}/responses`}
                className="w-full h-32 bg-[#f0ebf8] flex items-center justify-center p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#673ab7]"
                title="View Responses"
                aria-label="View responses"
            >
                <FileText size={32} className="text-[#673ab7] opacity-20" aria-hidden />
            </Link>
            <div className="p-4 border-t border-gray-200">
                <h3
                    className="text-sm font-medium text-gray-800 truncate mb-3"
                    title={form.title || 'Untitled form'}
                >
                    {form.title || 'Untitled form'}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <FileText size={12} className="text-[#673ab7]" />
                        <span>Opened</span>
                    </div>
                    <Link
                        to={`/forms/${form.id}/fill`}
                        className="text-xs font-medium text-[#673ab7] hover:underline px-2 py-1 bg-[#f0ebf8] rounded"
                    >
                        Fill form
                    </Link>
                </div>
            </div>
        </div>
    )
}
