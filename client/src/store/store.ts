import { configureStore } from '@reduxjs/toolkit'

import { api } from '../services/__generated__/generated'
import { counterSlice } from './slices/counterSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        counterSlice: counterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
