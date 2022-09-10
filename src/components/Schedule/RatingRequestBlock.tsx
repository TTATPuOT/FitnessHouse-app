import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export interface RatingRequestBlockProps {}

const RatingRequestBlock = ({}: RatingRequestBlockProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Вам нравится наше приложение?</Text>
			<View style={styles.buttons}>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>🤢 Есть проблемы</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>🎉 Всё отлично</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity>
				<Text style={styles.close}>Не показывайте это мне больше</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		borderBottomColor: '#FFF',
		borderBottomWidth: 1,
	},
	header: {
		fontSize: 20,
		fontFamily: 'Montserrat-Bold',
		color: '#FFF',
	},
	buttons: {
		flexDirection: 'row',
		flex: 1,
		marginTop: 10,
		marginHorizontal: -10,
	},
	button: {
		flex: 1,
		borderColor: '#FFF',
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'Montserrat-Bold',
		color: '#FFF',
	},
	close: {
		fontSize: 12,
		fontFamily: 'Montserrat-Medium',
		marginTop: 10,
		textAlign: 'center',
		textDecorationLine: 'underline',
		opacity: 0.5,
	},
})

export default RatingRequestBlock
