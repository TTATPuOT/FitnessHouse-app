import React, { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Lesson } from '@utils/ScheduleParser'
import Tag from '@components/Schedule/Tag'

export interface LessonBlockProps {
	last?: boolean
	lesson: Lesson
}

const LessonBlock = ({ last, lesson }: LessonBlockProps) => {
	const containerStyles = useMemo(() => {
		const stylesArray = [styles.container]
		//@ts-ignore
		if (last) stylesArray.push(styles.lastElement)

		return stylesArray
	}, [last])

	return (
		<TouchableOpacity activeOpacity={0.5} style={containerStyles}>
			<Text style={styles.title}>{lesson.title}</Text>
			<Text style={styles.location}>{lesson.location}</Text>
			<Text style={styles.teacher}>{lesson.teacher}</Text>

			<View style={styles.tags}>
				{lesson.paid && <Tag type='paid' />}
				{lesson.isSection && <Tag type='section' />}
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		borderWidth: 1,
		borderBottomColor: '#494949',
	},
	lastElement: {
		borderBottomColor: '#000',
		paddingBottom: 0,
	},
	title: {
		fontSize: 18,
		fontFamily: 'Montserrat-Bold',
		marginBottom: 20,
	},
	location: {
		fontFamily: 'Montserrat-Medium',
	},
	teacher: {
		fontFamily: 'Montserrat-Medium',
	},
	tags: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 15,
		marginLeft: -10,
	},
})

export default LessonBlock
