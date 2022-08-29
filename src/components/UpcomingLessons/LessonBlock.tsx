import React, { useState } from 'react'
import {
	ImageBackground,
	ImageRequireSource,
	StyleSheet,
	Text,
	View,
} from 'react-native'
import { Lesson } from '@utils/ScheduleParser'

export interface LessonBlockProps {
	lesson: Lesson
}

const IMAGES = [
	require('./img/1.png'),
	require('./img/2.png'),
	require('./img/3.png'),
	require('./img/4.png'),
]
const WATER_IMAGE = require('./img/water.png')

const LessonBlock = ({ lesson }: LessonBlockProps) => {
	const [img] = useState<ImageRequireSource>(getImgUri(lesson))

	return (
		<View style={styles.container}>
			<ImageBackground
				imageStyle={{ resizeMode: 'cover' }}
				source={img}
				style={styles.image}
			/>
			<View style={styles.text}>
				<Text style={styles.title}>{lesson.title}</Text>
				<Text style={styles.description}>{lesson.location}</Text>
			</View>
		</View>
	)
}

function getImgUri(lesson: Lesson): ImageRequireSource {
	if (lesson.location?.includes('бассейн')) return WATER_IMAGE

	return IMAGES[randomNumber(0, 3)]
}

function randomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		borderRadius: 20,
		marginBottom: 15,
		overflow: 'hidden',
		flexDirection: 'row',
	},
	image: {
		width: 85,
		height: 85,
	},
	text: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		flex: 1,
		paddingRight: 30,
	},
	title: {
		color: '#000',
		fontFamily: 'Montserrat-Bold',
		fontSize: 18,
		textAlign: 'right',
	},
	description: {
		color: '#000',
		fontFamily: 'Montserrat-Medium',
		textAlign: 'right',
	},
})

export default LessonBlock
