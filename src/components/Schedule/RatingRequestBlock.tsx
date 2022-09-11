import { useAppSelector } from '@src/hooks/redux'
import useAppMarketing from '@src/hooks/useAppMarketing'
import useRateApp from '@src/hooks/useRateApp'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native'

const RatingRequestBlock = () => {
	const handleRateApp = useRateApp()
	const { handleHideRateRequest } = useAppMarketing()

	const show = useAppSelector<boolean>(
		store =>
			store.marketing.ratingRequestShow &&
			store.marketing.launchesCount >= 5
	)
	const handleErrorPress = useCallback(
		() =>
			Linking.openURL(
				'mailto:neverov12@gmail.com?subject=Ошибка в приложении Fitness House&body=Здравствуйте! Есть проблема в вашем приложении:'
			),
		[]
	)

	if (!show) return null

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Вам нравится наше приложение?</Text>
			<View style={styles.buttons}>
				<TouchableOpacity
					style={styles.button}
					onPress={handleErrorPress}
				>
					<Text style={styles.buttonText}>🤢 Есть проблемы</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={handleRateApp}>
					<Text style={styles.buttonText}>🎉 Всё отлично</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={handleHideRateRequest}>
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
