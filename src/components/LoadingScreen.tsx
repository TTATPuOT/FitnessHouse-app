import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export interface LoadingScreenProps {}

const LoadingScreen = (props: LoadingScreenProps) => {
	return (
		<View style={styles.container}>
			<ActivityIndicator size='large' color='#FFF' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default LoadingScreen
