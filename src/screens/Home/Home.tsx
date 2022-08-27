import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Animated } from 'react-native'
import Schedule from '@components/Schedule'
import ScheduleParser, { Column } from '@utils/ScheduleParser'
import UpcomingLessons from '@components/UpcomingLessons'
import OfficeSelector from '@components/OfficeSelector'
import { useAppSelector } from '@hooks/redux'
import selectOffice from '@selectors/selectOffice'
import DateSelector from '@components/DateSelector'
import selectDate from '@selectors/selectDate'
import LoadingScreen from '@components/LoadingScreen'
import diffClamp = Animated.diffClamp

const HEADER_HEIGHT = 175

const Home = () => {
	const office = useAppSelector(selectOffice)
	const date = useAppSelector(selectDate)

	const [schedule, setSchedule] = useState<ScheduleParser>()
	const [column, setColumn] = useState<Column>()
	const [loading, setLoading] = useState<boolean>(false)

	const scrollY = useRef(new Animated.Value(0))
	const scrollYClamped = diffClamp(scrollY.current, 0, HEADER_HEIGHT)

	useEffect(() => {
		if (office) handleOfficeChange()
	}, [office])
	useEffect(() => {
		if (schedule) handleDateChange()
	}, [date, schedule])

	const handleOfficeChange = useCallback(() => {
		if (!office) return

		setSchedule(undefined)
		setColumn(undefined)
		setLoading(true)
		ScheduleParser.getInstance(office).then(schedule => {
			setSchedule(schedule)
			setColumn(schedule.getForDate(date))
			setLoading(false)
		})
	}, [schedule, office])
	const handleDateChange = useCallback(() => {
		if (!schedule) return

		setColumn(schedule.getForDate(date))
	}, [date, schedule])

	const handleScroll = Animated.event(
		[
			{
				nativeEvent: {
					contentOffset: { y: scrollY.current },
				},
			},
		],
		{
			useNativeDriver: true,
		}
	)
	const translateY = scrollYClamped.interpolate({
		inputRange: [0, HEADER_HEIGHT],
		outputRange: [0, -(HEADER_HEIGHT / 2)],
	})
	const translateYNumber = useRef()
	translateY.addListener(({ value }) => {
		translateYNumber.current = value
	})

	return (
		<>
			<Animated.View
				style={[styles.header, { transform: [{ translateY }] }]}
			>
				<OfficeSelector />
				{!!schedule && <DateSelector dates={schedule.getDates()} />}
			</Animated.View>
			<Animated.ScrollView
				style={styles.container}
				onScroll={handleScroll}
				contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
				showsVerticalScrollIndicator={false}
			>
				{loading && <LoadingScreen />}
				{!!column && !!schedule && (
					<>
						<UpcomingLessons column={column} />
						<Schedule column={column} />
					</>
				)}
			</Animated.ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		zIndex: 1,
		left: 0,
		top: 0,
		width: '100%',
		backgroundColor: '#000',
		paddingBottom: 10,
		borderWidth: 2,
		borderBottomColor: '#333',
	},
})

export default Home
