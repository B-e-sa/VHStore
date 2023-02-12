import { configureStore } from '@reduxjs/toolkit';
import genreReducer from './features/genreSlice'

export const store = configureStore({
    reducer: {
        genre: genreReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;