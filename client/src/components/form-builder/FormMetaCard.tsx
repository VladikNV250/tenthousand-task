import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    selectFormBuilder,
    selectFormBuilderErrors,
    updateDescription,
    updateTitle,
} from '@/store/slices/formBuilderSlice'

import { Card, Input } from '../ui'

export const FormMetaCard = () => {
    const { title, description, showErrors } = useAppSelector(selectFormBuilder)
    const dispatch = useAppDispatch()
    const errors = useAppSelector(selectFormBuilderErrors)

    return (
        <Card className="border-t-8 border-t-[#673ab7] rounded-t-lg flex flex-col gap-4 p-8!">
            <Input
                className="text-4xl w-full"
                placeholder="Form title"
                aria-label="Form title"
                required
                value={title}
                onChange={(e) => dispatch(updateTitle(e.target.value))}
                error={showErrors ? errors.title : undefined}
            />
            <Input
                className="text-sm text-gray-700 w-full"
                placeholder="Form description"
                aria-label="Form description"
                value={description}
                onChange={(e) => dispatch(updateDescription(e.target.value))}
            />
            {showErrors && errors.questions?.['form'] && (
                <p className="text-red-500 text-sm mt-1">{errors.questions?.['form']}</p>
            )}
        </Card>
    )
}
