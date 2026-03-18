import type { FC } from 'react'

import { QuestionType } from '@/services/__generated__/graphql-types'

interface Props {
    type: QuestionType.Text | QuestionType.Date
}

export const QuestionTypePreview: FC<Props> = ({ type }) => {
    switch (type) {
        case QuestionType.Text:
            return <TextPreview />
        case QuestionType.Date:
            return <DatePreview />
        default:
            return null
    }
}

const TextPreview: FC = () => {
    return <input type="text" disabled placeholder="Answer text" />
}

const DatePreview: FC = () => {
    return <input type="date" disabled placeholder="Answer text" />
}
