import React, { useCallback, useRef } from 'react'
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	Animated,
	ViewStyle,
} from 'react-native'
import TimeBlock from '@components/Schedule/TimeBlock'
import { Column, TimePeriod } from '@utils/ScheduleParser'
import UpcomingLessons from '@components/UpcomingLessons'
import Footer from '@components/Footer'
import FilterButton from '@components/FilterButton'

export interface ScheduleProps {
	column: Column
	showUpcomingLessons: boolean
	showFooter: boolean
	handleScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
	style: ViewStyle
}

const Schedule = ({
	column,
	showUpcomingLessons,
	showFooter,
	handleScroll,
	style,
}: ScheduleProps) => {
	const flatListRef = useRef<FlatList>(null)

	const handleUpcomingLessonPress = useCallback(
		(lessonId: string) => {
			if (!flatListRef.current) return

			const viewOffset = style.paddingTop
				? parseInt(style.paddingTop.toString()) / 2
				: 0

			const index = column.timePeriods.findIndex(t =>
				t.lessons.some(l => l.id === lessonId)
			)
			if (index >= 0)
				flatListRef.current.scrollToIndex({
					index,
					viewOffset,
					animated: true,
					viewPosition: 0,
				})
		},
		[flatListRef, column.timePeriods, style]
	)
	const renderItem = useCallback(
		({ item }: { item: TimePeriod }) => (
			<TimeBlock key={item.time} period={item} />
		),
		[]
	)

	return (
		<>
			{/*<FilterButton />*/}
			<Animated.FlatList
				contentContainerStyle={style}
				onScroll={handleScroll}
				ref={flatListRef}
				data={column.timePeriods}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListFooterComponent={!showFooter ? null : <Footer />}
				ListHeaderComponent={
					!showUpcomingLessons ? null : (
						<UpcomingLessons
							column={column}
							handlePress={handleUpcomingLessonPress}
						/>
					)
				}
			/>
		</>
	)
}

Schedule.defaultProps = {
	showUpcomingLessons: false,
	showFooter: false,
	handleScroll: () => {},
	style: {},
}

export default Schedule
