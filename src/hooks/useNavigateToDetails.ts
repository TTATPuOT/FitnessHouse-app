import { Lesson } from '@utils/ScheduleParser'
import { useCallback } from 'react'
import { useAppNavigation } from '@hooks/useAppNavigation'
import analytics from '@react-native-firebase/analytics'

const useNavigateToDetails = () => {
	const navigation = useAppNavigation()

	return useCallback(
		async (lesson: Lesson) => {
			await analytics().logEvent('lessonDetails', { lesson })

			navigation.navigate('Details', {
				lesson,
				date: new Date().toDateString(), //TODO: Вынести дату в объект Lesson
			})
		},
		[navigation]
	)
}

export default useNavigateToDetails
