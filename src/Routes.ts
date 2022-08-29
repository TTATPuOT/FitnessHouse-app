import { Lesson } from '@utils/ScheduleParser'

export type RootStackParamList = {
	Home: undefined
	OfficeList: undefined
	Details: {
		lesson: Lesson
		date: string
	}
}
