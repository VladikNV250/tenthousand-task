import type { PayloadAction } from '@reduxjs/toolkit'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { validateCreateNewForm } from '@/lib'
import type { Question } from '@/services/__generated__/graphql'

import type { RootState } from '../store'

interface FormBuilderState {
    title: string
    description: string
    questions: Array<Question>
    showErrors: boolean
}

const initialState: FormBuilderState = {
    title: 'Untitled form',
    description: '',
    questions: [],
    showErrors: false,
}

export const formBuilderSlice = createSlice({
    name: 'formBuilder',
    initialState,
    reducers: {
        updateTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.description = action.payload
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.questions.push(action.payload)
        },
        updateQuestion: (state, action: PayloadAction<Question>) => {
            state.questions = state.questions.map((q) =>
                q.id === action.payload.id ? action.payload : q,
            )
        },
        removeQuestion: (state, action: PayloadAction<string>) => {
            state.questions = state.questions.filter((q) => q.id !== action.payload)
        },
        moveQuestion: (state, action: PayloadAction<{ id: string; direction: 'up' | 'down' }>) => {
            const { id, direction } = action.payload
            const index = state.questions.findIndex((q) => q.id === id)
            if (index === -1) return
            const newIndex = direction === 'up' ? index - 1 : index + 1
            if (newIndex < 0 || newIndex >= state.questions.length) return
            const [movedQuestion] = state.questions.splice(index, 1)
            state.questions.splice(newIndex, 0, movedQuestion)
        },
        resetForm: () => initialState,
        setShowErrors: (state, action: PayloadAction<boolean>) => {
            state.showErrors = action.payload
        },
    },
})

export const {
    updateTitle,
    updateDescription,
    addQuestion,
    updateQuestion,
    removeQuestion,
    resetForm,
    moveQuestion,
    setShowErrors,
} = formBuilderSlice.actions

export const selectFormBuilder = (state: RootState) => state.formBuilderSlice

export const selectFormBuilderErrors = createSelector(
    [
        (state: RootState) => state.formBuilderSlice.title,
        (state: RootState) => state.formBuilderSlice.questions,
    ],
    (title, questions) => {
        return validateCreateNewForm(title, questions)
    },
)

export default formBuilderSlice.reducer
