import { Lesson } from '@utils/ScheduleParser'
import { useCallback } from 'react'
import { useAppNavigation } from '@hooks/useAppNavigation'

const useNavigateToDetails = () => {
	const navigation = useAppNavigation()

	return useCallback(
		(lesson: Lesson) => {
			navigation.navigate('Details', {
				lesson,
				date: new Date().toDateString(), //TODO: Вынести дату в объект Lesson
			})
		},
		[navigation]
	)
}

export default useNavigateToDetails
