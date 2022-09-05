import { useCallback } from 'react'
import { useAppNavigation } from '@hooks/useAppNavigation'

const useNavigateToFilters = () => {
	const navigation = useAppNavigation()

	return useCallback(() => {
		navigation.navigate('Filters')
	}, [navigation])
}

export default useNavigateToFilters
