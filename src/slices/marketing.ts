import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MarketingState {
	launchesCount: number
}

const initialState: MarketingState = {
	launchesCount: 0,
}

export const marketingSlice = createSlice({
	name: 'marketing',
	initialState,
	reducers: {
		appLaunch: state => {
			state.launchesCount += 1
		},
	},
})

export const { appLaunch } = marketingSlice.actions

export default marketingSlice.reducer
