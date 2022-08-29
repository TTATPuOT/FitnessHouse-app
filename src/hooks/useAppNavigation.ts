import { useNavigation } from '@react-navigation/native'
import { HomeScreenNavigationProp } from '@src/Routes'

export const useAppNavigation = () => useNavigation<HomeScreenNavigationProp>()
