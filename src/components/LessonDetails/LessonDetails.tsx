import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Lesson } from '@utils/ScheduleParser'
import Tag from '@components/Tag'

export interface LessonDetailsProps {
	lesson: Lesson
}

const LessonDetails = ({ lesson }: LessonDetailsProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{lesson.title}</Text>

			<Text style={styles.description}>{lesson.description}</Text>

			<Text style={styles.location}>{lesson.location}</Text>
			<Text style={styles.teacher}>Ведёт {lesson.teacher}</Text>

			<View style={styles.tags}>
				{lesson.paid && <Tag type='paid' />}
				{lesson.isSection && <Tag type='section' />}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	title: {
		fontSize: 32,
		fontFamily: 'Montserrat-Bold',
		color: '#FFF',
	},
	location: {
		marginTop: 20,
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
	},
	teacher: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
	},
	description: {
		marginTop: 20,
		fontSize: 18,
		fontFamily: 'Montserrat-Medium',
	},
	tags: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
})

export default LessonDetails
