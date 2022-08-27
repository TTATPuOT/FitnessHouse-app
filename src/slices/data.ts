import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DataState {
	office?: string
}

const initialState: DataState = {}

export const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		selectOffice: (state, action: PayloadAction<string>) => {
			state.office = action.payload
		},
	},
})

export const { selectOffice } = dataSlice.actions

export default dataSlice.reducer
