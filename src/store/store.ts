import { configureStore } from "@reduxjs/toolkit";
import investmentReducer from './investmentSlice';

export const store = configureStore({
    reducer: {
        investment: investmentReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch