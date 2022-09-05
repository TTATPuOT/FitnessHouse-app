import React, { useCallback, useEffect, useRef } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import DayBlock from '@components/DateSelector/DayBlock'
import { useAppSelector } from '@hooks/redux'
import selectDate from '@selectors/selectDate'

interface DateSelectorProps {
	dates: Date[]
}

const DateSelector = ({ dates }: DateSelectorProps) => {
	const date = useAppSelector(selectDate)
	const flatListRef = useRef<FlatList>(null)

	const renderBlock = useCallback(
		({ item }: { item: Date }) => {
			return (
				<DayBlock
					date={item}
					selected={date.toDateString() === item.toDateString()}
				/>
			)
		},
		[date]
	)

	const scrollToIndex = useCallback(() => {
		if (!flatListRef.current) return

		const index = getDateIndex(date, dates)

		if (index >= 0)
			flatListRef.current.scrollToIndex({
				animated: true,
				index,
				viewPosition: 0.25,
			})
	}, [flatListRef, date, dates])
	useEffect(() => {
		scrollToIndex()
	}, [dates, date])

	return (
		<FlatList
			ref={flatListRef}
			data={dates}
			extraData={date}
			renderItem={renderBlock}
			onScrollToIndexFailed={() => {}}
			keyExtractor={(item: Date) => item.toDateString()}
			horizontal
			showsHorizontalScrollIndicator={false}
			style={styles.container}
			onLayout={scrollToIndex}
			contentContainerStyle={{ paddingRight: 20 }}
		/>
	)
}

const getDateIndex = (date: Date, dates: Date[]) => {
	const dateString = date.toDateString()
	return dates.findIndex(d => d.toDateString() === dateString)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})

export default DateSelector
