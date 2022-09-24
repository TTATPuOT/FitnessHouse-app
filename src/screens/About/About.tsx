import useRateApp from '@src/hooks/useRateApp'
import React, { useCallback } from 'react'
import {
	Linking,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import analytics from '@react-native-firebase/analytics'

const About = () => {
	const handleRateApp = useRateApp()

	const handleLinkPress = useCallback(
		(url: string) => Linking.openURL(url),
		[]
	)
	const handleGooglePlayPress = useCallback(async () => {
		await analytics().logEvent('detailsGooglePlayPress')
		await handleRateApp()
	}, [handleRateApp])

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.h2}>
				Пожалуйста, поставьте 5 звёд приложению
			</Text>
			<TouchableOpacity onPress={handleGooglePlayPress}>
				<Text style={[styles.h1, styles.link]}>
					✨ Открыть Google Play
				</Text>
			</TouchableOpacity>
			<View style={styles.space} />
			<Text style={styles.h2}>Разработал</Text>
			<Text style={styles.h1}>Антон Неверов</Text>
			<View style={styles.space} />
			<Text style={styles.h2}>По всем вопросам о работе приложения</Text>
			<TouchableOpacity
				onPress={() => handleLinkPress('mailto:neverov12@gmail.com')}
			>
				<Text style={[styles.h1, styles.link]}>
					🚧 neverov12@gmail.com
				</Text>
			</TouchableOpacity>
			<View style={styles.space} />
			<Text style={styles.h2}>Сайт разработчика</Text>
			<TouchableOpacity
				onPress={() => handleLinkPress('https://patriotovsky.ru/')}
			>
				<Text style={[styles.h1, styles.link]}>patriotovsky.ru</Text>
			</TouchableOpacity>
			<View style={styles.space} />
			<Text style={styles.h2}>Сайт Fitness House</Text>
			<TouchableOpacity
				onPress={() => handleLinkPress('https://www.fitnesshouse.ru/')}
			>
				<Text style={[styles.h1, styles.link]}>fitnesshouse.ru</Text>
			</TouchableOpacity>
			<View style={styles.space} />
			<Text style={styles.h2}>
				Это не официальное приложение. Администрация сети клубов Fitness
				House никак не связана с разработчиком приложения
			</Text>
			<View style={styles.space} />
			<Text style={styles.h2}>
				Версия приложения {DeviceInfo.getVersion()} 🚀
			</Text>
			<Text style={styles.h2}>Создано в 2022 с 💖</Text>
			<View style={styles.space} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	h1: {
		fontFamily: 'Montserrat-Bold',
		fontSize: 20,
		color: '#FFF',
	},
	h2: {
		fontFamily: 'Montserrat-Medium',
		color: '#FFF',
	},
	link: {
		textDecorationLine: 'underline',
	},
	space: {
		height: 30,
	},
})

export default About
