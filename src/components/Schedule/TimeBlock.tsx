import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LessonBlock from '@components/Schedule/LessonBlock'
import { TimePeriod } from '@utils/ScheduleParser'
import RatingRequestBlock from './RatingRequestBlock'

export interface TimeBlockProps {
	period: TimePeriod
}

const TimeBlock = ({ period }: TimeBlockProps) => {
	const lessonsBlocks = useMemo<JSX.Element[]>(() => {
		const blocks: JSX.Element[] = []

		for (const [index, lesson] of period.lessons.entries()) {
			blocks.push(
				<LessonBlock
					key={lesson.id}
					lesson={lesson}
					last={!period.lessons[index + 1]}
				/>
			)
		}

		return blocks
	}, [period])
	const status = useMemo<string>(() => {
		const date = new Date()
		if (date.toDateString() !== period.date.toDateString()) return ''

		const currentHours = date.getHours()

		if (period.time === currentHours) return 'сейчас'
		if (period.time - 1 === currentHours) return 'скоро'

		return ''
	}, [period.time])

	return (
		<>
			<View style={styles.container}>
				<View>
					<View style={styles.time}>
						<Text style={styles.timeText}>{period.time}</Text>
						<Text style={styles.timeTextSmall}>00</Text>
					</View>
					{!!status && (
						<Text style={styles.description}>{status}</Text>
					)}
				</View>
				<View style={styles.lessons}>{lessonsBlocks}</View>
			</View>
			{status === 'скоро' && <RatingRequestBlock />}
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingHorizontal: 15,
		paddingVertical: 20,
		borderWidth: 1,
		borderBottomColor: '#FFF',
	},
	time: {
		backgroundColor: '#FFF',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginLeft: -15,
		padding: 3,
		paddingLeft: 15,
		paddingRight: 10,
		borderTopRightRadius: 20,
		borderBottomRightRadius: 20,
		width: 85,
	},
	timeText: {
		color: '#000',
		fontSize: 32,
		fontFamily: 'Montserrat-Bold',
	},
	timeTextSmall: {
		color: '#000',
		fontSize: 18,
		fontFamily: 'Montserrat-Bold',
		marginTop: 3,
	},
	lessons: {
		paddingLeft: 10,
		flex: 1,
		marginTop: -20,
	},
	description: {
		flex: 1,
		marginLeft: -15,
		textAlign: 'center',
		fontFamily: 'Montserrat-Medium',
	},
})

export default TimeBlock
