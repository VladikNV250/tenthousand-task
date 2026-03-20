import { type Answer, type Form, QuestionType } from '@/services/__generated__/graphql'

export const validateSubmitResponse = (
    form: Form,
    answers: Partial<Record<string, Omit<Answer, 'id'>>>,
): Record<string, string> => {
    const errors: Record<string, string> = {}

    form.questions.forEach((question) => {
        const answer = answers[question.id]

        if (question.required && (!answer || answer.value.length === 0)) {
            errors[question.id] = 'This field is required'
            return
        }

        if (!answer || answer.value.length === 0) {
            return
        }

        const options = question.options || []

        if (question.type === QuestionType.Text) {
            if (answer.value.some((v) => !v.trim())) {
                errors[question.id] = 'Answer cannot be just blanks'
            }
        } else if (question.type === QuestionType.MultipleChoice) {
            if (answer.value.length !== 1) {
                errors[question.id] = 'Please select exactly one option'
            } else if (options.length && !options.includes(answer.value[0])) {
                errors[question.id] = 'Invalid option selected'
            }
        } else if (question.type === QuestionType.Checkboxes) {
            if (options.length && answer.value.some((v) => !options.includes(v))) {
                errors[question.id] = 'Invalid option selected'
            }
        } else if (question.type === QuestionType.Date) {
            if (answer.value.length !== 1) {
                errors[question.id] = 'Please select a date'
            } else if (isNaN(Date.parse(answer.value[0]))) {
                errors[question.id] = 'Invalid date format'
            }
        }
    })

    return errors
}
