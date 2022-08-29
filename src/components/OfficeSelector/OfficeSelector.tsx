import React, { useCallback } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector } from '@hooks/redux'
import selectOffice from '@selectors/selectOffice'
import { useAppNavigation } from '@hooks/useAppNavigation'

const OfficeSelector = () => {
	const navigation = useAppNavigation()
	const office = useAppSelector(selectOffice)

	const handleClick = useCallback(() => {
		navigation.navigate('OfficeList')
	}, [])

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={handleClick}>
				<Text style={styles.title}>
					{office?.name ?? 'Выберите филиал'}
				</Text>
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
