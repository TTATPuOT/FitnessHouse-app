import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Schedule from '@components/Schedule'
import ScheduleParser, { Column } from '@utils/ScheduleParser'
import UpcomingLessons from '@components/UpcomingLessons'
import OfficeSelector from '@components/OfficeSelector'
import { useAppSelector } from '@hooks/redux'
import selectOffice from '@components/selectors/selectOffice'

const Home = () => {
	const office = useAppSelector(selectOffice)

	const [schedule, setSchedule] = useState<ScheduleParser>()
	const [column, setColumn] = useState<Column>()

	useEffect(() => {
		if (office) refresh()
	}, [office])

	const refresh = useCallback(() => {
		if (!office) return

		setSchedule(undefined)
		setColumn(undefined)
		ScheduleParser.getInstance(office).then(schedule => {
			setSchedule(schedule)
			setColumn(schedule.getForDate(new Date()))
		})
	}, [schedule, office])

	return (
		<ScrollView style={styles.container}>
			<OfficeSelector />
			{!!column && (
				<>
					<UpcomingLessons column={column} />
					<Schedule column={column} />
				</>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default Home
