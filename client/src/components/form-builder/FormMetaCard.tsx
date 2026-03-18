import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectFormBuilder, updateDescription, updateTitle } from '@/store/slices/formBuilderSlice'

import { Card } from '../ui'

export const FormMetaCard = () => {
    const formData = useAppSelector(selectFormBuilder)
    const dispatch = useAppDispatch()

    return (
        <Card className="border-t-8 border-violet-500 outline outline-gray-200 flex flex-col gap-4 ">
            <input
                type="text"
                className="text-3xl"
                placeholder="Form title"
                required
                value={formData.title}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
            <input
                type="text"
                placeholder="Form description"
                value={formData.description}
                onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
        </Card>
    )
}
