import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Office } from '@utils/OfficesParser'

export interface DataState {
	office?: Office
	date: string
}

const initialState: DataState = {
	date: new Date().toDateString(),
}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		setOffice: (state, action: PayloadAction<Office>) => {
			state.office = action.payload
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload
		},
	},
})

export const { setOffice, setDate } = dataSlice.actions

export default dataSlice.reducer
