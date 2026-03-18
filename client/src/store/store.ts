import { configureStore } from '@reduxjs/toolkit'

import { api } from '@/services/__generated__/graphql'

import { formBuilderSlice } from './slices/formBuilderSlice'

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        formBuilderSlice: formBuilderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
