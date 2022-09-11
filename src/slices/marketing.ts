import { createSlice } from '@reduxjs/toolkit'

export interface MarketingState {
	launchesCount: number
	ratingRequestShow: boolean
}

const initialState: MarketingState = {
	launchesCount: 0,
	ratingRequestShow: true,
}

export const marketingSlice = createSlice({
	name: 'marketing',
	initialState,
	reducers: {
		appLaunch: state => {
			state.launchesCount += 1
		},
		hideRatingRequest: state => {
			state.ratingRequestShow = false
		},
	},
})

export const { appLaunch, hideRatingRequest } = marketingSlice.actions

export default marketingSlice.reducer
