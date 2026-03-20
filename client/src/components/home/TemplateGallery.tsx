import { Plus } from 'lucide-react'
import type { FC } from 'react'
import { useNavigate } from 'react-router'

export const TemplateGallery: FC = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full bg-[#f1f3f4] py-8 px-6">
            <div className="max-w-[1000px] mx-auto">
                <h2 className="text-base font-medium text-gray-800 mb-4">Start a new form</h2>
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => void navigate('/forms/new')}
                        className="group flex flex-col items-start gap-2 cursor-pointer focus:outline-none"
                    >
                        <div className="w-40 h-32 bg-white rounded-md border border-gray-300 hover:border-[#673ab7] transition-colors flex items-center justify-center group-focus-visible:ring-2 group-focus-visible:ring-[#673ab7] shadow-sm">
                            <Plus size={48} className="text-[#ea4335]" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Blank</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
