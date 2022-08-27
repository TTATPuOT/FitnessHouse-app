import { RootState } from '@src/store'

const selectDate = (state: RootState) => new Date(state.data.date)

export default selectDate
