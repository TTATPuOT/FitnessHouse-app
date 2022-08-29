import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '@src/Routes'
import LessonDetails from '@components/LessonDetails'

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Details = ({ route }: DetailsProps) => {
	const { params } = route

	return (
		<View style={styles.container}>
			<LessonDetails lesson={params.lesson} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default Details
