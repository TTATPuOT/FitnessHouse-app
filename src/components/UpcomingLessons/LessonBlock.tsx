import React from 'react'
import {
	ImageBackground,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { Lesson } from '@utils/ScheduleParser'

export interface LessonBlockProps {
	lesson: Lesson
}

const LessonBlock = ({ lesson }: LessonBlockProps) => {
	return (
		<TouchableOpacity activeOpacity={0.5} style={styles.container}>
			<ImageBackground
				imageStyle={{ resizeMode: 'cover' }}
				source={require('./img/img.png')}
				style={styles.image}
			/>
			<View style={styles.text}>
				<Text style={styles.title}>{lesson.title}</Text>
				<Text style={styles.description}>{lesson.location}</Text>
			</View>
		</TouchableOpacity>
	)
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
