import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import useNavigateToFilters from '@hooks/useNavigateToFilters'

const FilterButton = () => {
	const handlePress = useNavigateToFilters()

	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.5}
			onPress={handlePress}
		>
			<Text style={styles.text}>⚙️</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: '#FFF',
		borderRadius: 15,
		width: 50,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
		bottom: 20,
		right: 20,
		borderWidth: 1,
		borderColor: '#000',
	},
	text: {
		fontSize: 25,
	},
})

export default FilterButton
