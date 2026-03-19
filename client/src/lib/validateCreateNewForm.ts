import { type Question, QuestionType } from '@/services/__generated__/graphql'

export type FormBuilderErrors = {
    title?: string
    questions?: Record<string, string> // id -> error message
}

export const validateCreateNewForm = (title: string, questions: Question[]): FormBuilderErrors => {
    const errors: FormBuilderErrors = {}

    if (!title.trim()) {
        errors.title = 'Form title is required'
    }

    if (questions.length === 0) {
        if (!errors.questions) errors.questions = {}
        errors.questions.form = 'Form must have at least one question'
        return errors
    }

    const questionErrors: Record<string, string> = {}

    questions.forEach((q) => {
        if (!q.text.trim()) {
            questionErrors[q.id] = 'Question text cannot be empty'
        } else if (q.type === QuestionType.MultipleChoice || q.type === QuestionType.Checkboxes) {
            if (!q.options || q.options.length < 2) {
                questionErrors[q.id] = 'Must have at least 2 options'
            } else if (q.options.some((opt) => !opt.trim())) {
                questionErrors[q.id] = 'Options cannot be empty strings'
            }
        }
    })

    if (Object.keys(questionErrors).length > 0) {
        errors.questions = questionErrors
    }

    return errors
}
