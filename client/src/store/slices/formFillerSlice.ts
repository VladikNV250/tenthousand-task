import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { Answer } from '@/services/__generated__/graphql'

import type { RootState } from '../store'

interface FormFillerState {
    answers: Partial<Record<string, Omit<Answer, 'id'>>>
}

const initialState: FormFillerState = {
    answers: {},
}

export const formFillerSlice = createSlice({
    name: 'formFiller',
    initialState,
    reducers: {
        addAnswer: (state, action: PayloadAction<Omit<Answer, 'id'>>) => {
            state.answers[action.payload.questionId] = action.payload
        },
        clearAnswers: (state) => {
            state.answers = {}
        },
    },
})

export const { addAnswer, clearAnswers } = formFillerSlice.actions

export const selectFormFiller = (state: RootState) => state.formFillerSlice
export const selectAnswerByQuestionId = (questionId: string) => (state: RootState) =>
    state.formFillerSlice.answers[questionId]

export default formFillerSlice.reducer
