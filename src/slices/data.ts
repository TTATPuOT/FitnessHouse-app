import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Office } from '@utils/OfficesParser'
import { Region } from '@utils/RegionsParser'

export interface DataState {
	office?: Office
	region?: Region
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
		setRegion: (state, action: PayloadAction<Region>) => {
			state.region = action.payload
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload
		},
	},
})

export const { setOffice, setDate, setRegion } = dataSlice.actions

export default dataSlice.reducer
