import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppNavigation } from '@hooks/useAppNavigation'

const Footer = () => {
	const navigation = useAppNavigation()
	const handlePress = useCallback(() => navigation.navigate('About'), [])
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handlePress}>
				<Text style={styles.text}>Об авторе</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { marginVertical: 20, paddingHorizontal: 10 },
	text: {
		fontFamily: 'Montserrat-Medium',
		textDecorationLine: 'underline',
		textAlign: 'center',
	},
})

export default Footer
