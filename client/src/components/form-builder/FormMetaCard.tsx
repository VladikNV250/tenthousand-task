import { useAppDispatch, useAppSelector } from '@/hooks'
import { selectFormBuilder, updateDescription, updateTitle } from '@/store/slices/formBuilderSlice'

import { Card, Input } from '../ui'

export const FormMetaCard = () => {
    const formData = useAppSelector(selectFormBuilder)
    const dispatch = useAppDispatch()

    return (
        <Card className="border-t-8 border-t-[#673ab7] rounded-t-lg flex flex-col gap-4 p-8!">
            <Input
                className="text-4xl w-full"
                placeholder="Form title"
                aria-label="Form title"
                required
                value={formData.title}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
            />
            <Input
                className="text-sm text-gray-700 w-full"
                placeholder="Form description"
                aria-label="Form description"
                value={formData.description}
                onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
        </Card>
    )
}
