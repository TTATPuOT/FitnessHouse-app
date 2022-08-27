import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useAppSelector } from '@hooks/redux'
import selectOffice from '@selectors/selectOffice'

const OfficeSelector = () => {
	const navigation = useNavigation()
	const office = useAppSelector(selectOffice)

	const handleClick = useCallback(() => {
		//@ts-ignore
		navigation.navigate('OfficeList')
	}, [])

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleClick}>
				<Text style={styles.title}>{office ?? 'Выберите филиал'}</Text>
			</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 25,
		flex: 1,
	},
	title: {
		fontSize: 32,
		fontFamily: 'Montserrat-Bold',
		textAlign: 'center',
		textDecorationLine: 'underline',
		color: '#FFF',
	},
})

export default OfficeSelector
