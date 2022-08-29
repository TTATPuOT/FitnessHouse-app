import { Lesson } from '@utils/ScheduleParser'
import { useNavigation } from '@react-navigation/native'
import { useCallback } from 'react'

const useNavigateToDetails = () => {
	const navigation = useNavigation()

	return useCallback(
		(lesson: Lesson) => {
			//@ts-ignore
			navigation.navigate('Details', { lesson })
		},
		[navigation]
	)
}

export default useNavigateToDetails
