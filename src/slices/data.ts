import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
	office?: string
	date: string
}

const initialState: DataState = {
	date: new Date().toDateString(),
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setOffice: (state, action: PayloadAction<string>) => {
			state.office = action.payload
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload
		},
	},
})

export const { setOffice, setDate } = dataSlice.actions

export default dataSlice.reducer
