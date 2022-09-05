import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { useAppDispatch } from '@hooks/redux'
import { setDate } from '@slices/data'

export interface DayBlockProps {
	date: Date
	selected?: boolean
}

const DayBlock = ({ date, selected }: DayBlockProps) => {
	const dispatch = useAppDispatch()

	const handlePress = useCallback(() => {
		dispatch(setDate(date.toDateString()))
	}, [date])

	const dayOfWeek = useMemo<string>(() => moment(date).format('ddd'), [date])

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={[
				styles.container,
				{ backgroundColor: selected ? '#FFF' : '#888' },
			]}
		>
			<Text style={styles.day}>{dayOfWeek}</Text>
			<Text style={styles.date}>{date.getDate()}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		borderRadius: 20,
		width: 60,
		height: 70,
		justifyContent: 'center',
	},
	day: {
		color: '#000',
		textAlign: 'center',
		fontFamily: 'Montserrat-Medium',
	},
	date: {
		color: '#000',
		textAlign: 'center',
		fontFamily: 'Montserrat-Bold',
		fontSize: 28,
	},
})

export default DayBlock
