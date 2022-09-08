import { RootState } from '@src/store'
import { Region } from '@utils/RegionsParser'

const selectRegion = (state: RootState): Region | undefined => state.data.region

export default selectRegion
