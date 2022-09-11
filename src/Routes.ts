import { Lesson } from '@utils/ScheduleParser'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type RootStackParamList = {
	Home: undefined
	OfficeList: undefined
	Details: {
		lesson: Lesson
		date: string
	}
	About: undefined
	Filters: undefined
	Report: undefined
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'Home'
>

export type OfficeListScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'OfficeList'
>

export type DetailsScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'Details'
>

export type AboutScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'About'
>
