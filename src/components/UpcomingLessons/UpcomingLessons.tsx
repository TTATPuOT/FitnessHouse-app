import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Column, TimePeriod } from '@utils/ScheduleParser'
import LessonBlock from '@components/UpcomingLessons/LessonBlock'
import moment from 'moment'

export interface UpcomingLessonsProps {
	column: Column
}

const UpcomingLessons = ({ column }: UpcomingLessonsProps) => {
	const [time, setTime] = useState<string>('')

	const timePeriod = useMemo<TimePeriod | undefined>(() => {
		if (column.date.toDateString() !== new Date().toDateString())
			return undefined

		const nextHour = new Date().getHours() + 1

		for (const period of column.timePeriods) {
			if (period.time === nextHour) return period
		}

		return undefined
	}, [column.timePeriods])

	const lessonsBlocks = useMemo<JSX.Element[]>(() => {
		if (!timePeriod) return []

		return timePeriod.lessons.map(l => (
			<LessonBlock lesson={l} key={l.title} />
		))
	}, [timePeriod])

	const updateTime = useCallback(() => {
		if (!timePeriod) return setTime('')

		const date = new Date()
		date.setHours(timePeriod.time)
		date.setMinutes(0)

		return setTime(moment(date).fromNow().toUpperCase())
	}, [timePeriod])

	useEffect(() => {
		updateTime()
	}, [column.date])

	if (lessonsBlocks.length <= 0) return null

	return (
		<View style={styles.container}>
			<View style={styles.timeContainer}>
				<Text style={styles.time}>{time}</Text>
			</View>
			{lessonsBlocks}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	timeContainer: {
		marginBottom: 10,
	},
	time: {
		fontFamily: 'Montserrat-Bold',
		textAlign: 'center',
	},
})

export default UpcomingLessons
