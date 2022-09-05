import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Select from '@components/Select'

const Filters = () => {
	return (
		<ScrollView style={styles.container}>
			<View style={styles.block}>
				<Text style={styles.title}>Тип занятий</Text>
				<Select
					options={[
						{ value: 'free', label: 'Бесплатные' },
						{ value: 'paid', label: 'Платные' },
						{ value: 'section', label: 'Секции' },
					]}
				/>
			</View>
			<View style={styles.block}>
				<Text style={styles.title}>Локация</Text>
				<Select
					options={[
						{ value: 'Аэробный зал', label: 'Аэробный зал' },
						{ value: 'Водный комплекс', label: 'Водный комплекс' },
						{ value: 'Тренажерный зал', label: 'Тренажерный зал' },
					]}
				/>
			</View>
			<View style={styles.block}>
				<Text style={styles.title}>Название</Text>
				<Select
					options={[
						{ value: 'BSA', label: 'BSA' },
						{ value: 'Lower body', label: 'Lower body' },
						{ value: 'Fitness Yoga', label: 'Fitness Yoga' },
						{ value: 'Body Sculpt', label: 'Body Sculpt' },
					]}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	block: {
		marginBottom: 30,
	},
	title: {
		fontFamily: 'Montserrat-Bold',
		fontSize: 24,
		color: '#FFF',
		marginBottom: 10,
	},
	tags: {
		flexDirection: 'row',
		marginLeft: -10,
	},
})

export default Filters
