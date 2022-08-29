import { RootState } from '@src/store'
import { Office } from '@utils/OfficesParser'

const selectOffice = (state: RootState): Office | undefined => state.data.office

export default selectOffice
