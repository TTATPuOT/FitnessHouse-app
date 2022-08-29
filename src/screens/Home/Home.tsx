import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Animated } from 'react-native'
import Schedule from '@components/Schedule'
import ScheduleParser, { Column } from '@utils/ScheduleParser'
import UpcomingLessons from '@components/UpcomingLessons'
import { useAppSelector } from '@hooks/redux'
import selectOffice from '@selectors/selectOffice'
import selectDate from '@selectors/selectDate'
import LoadingScreen from '@components/LoadingScreen'
import diffClamp = Animated.diffClamp
import HomeHeader from '@screens/Home/HomeHeader'
import AnimatedValue = Animated.AnimatedValue

const HEADER_MIN_HEIGHT = 90

const Home = () => {
	const office = useAppSelector(selectOffice)
	const date = useAppSelector(selectDate)

	const [schedule, setSchedule] = useState<ScheduleParser>()
	const [column, setColumn] = useState<Column>()
	const [loading, setLoading] = useState<boolean>(false)
	const [headerHeight, setHeaderHeight] = useState<number>(0)
	const [minHeaderHeight, setMinHeaderHeight] = useState<number>(0)

	useEffect(() => {
		let newValue = headerHeight - HEADER_MIN_HEIGHT
		if (newValue < 0) newValue = 0
		setMinHeaderHeight(newValue)
	}, [headerHeight])

	const scrollY = useRef(new Animated.Value(0))
	const scrollYClamped = diffClamp(scrollY.current, 0, minHeaderHeight)

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
		ScheduleParser.getInstance(office.code).then(schedule => {
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
		inputRange: [0, minHeaderHeight],
		outputRange: [0, -minHeaderHeight],
	})
	const translateYNumber = useRef<AnimatedValue>()
	translateY.addListener(({ value }) => {
		translateYNumber.current = value
	})

	return (
		<>
			<HomeHeader
				translateY={translateY}
				dates={schedule?.getDates()}
				setHeaderHeight={setHeaderHeight}
			/>
			<Animated.ScrollView
				style={styles.container}
				onScroll={handleScroll}
				contentContainerStyle={{ paddingTop: headerHeight }}
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
})

export default Home
