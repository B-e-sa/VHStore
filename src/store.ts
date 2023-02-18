import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './features/apiSlice';

export const store = configureStore({
    reducer: {
        api: apiSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;