import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
    id: string,
    name: string,
    location: string
}

export interface InvestmentState {
    project: Project,
    email: string,
    amount: number
}



const initialState: InvestmentState = {
    project: {
        id: '',
        name: '',
        location: ''
    },
    email: '',
    amount: 0
}

export const investmentSlice = createSlice({
    name: 'investment',
    initialState,
    reducers: {
        addProject: (state, action: PayloadAction<Project>) => {
            state.project = {...action.payload}
        },
        addEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        addAmount: (state, action: PayloadAction<number>) => {
            state.amount = action.payload
        }
    }
})

export const { addProject, addEmail, addAmount } = investmentSlice.actions
export default investmentSlice.reducer