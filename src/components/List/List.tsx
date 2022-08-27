import React, { useMemo } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'

export interface ListElement {
	text: string
	value: string
}

export interface ListProps {
	list: ListElement[]
	onChange: (newValue: string) => void
}

const List = ({ onChange, list }: ListProps) => {
	const elements = useMemo<JSX.Element[]>(() => {
		return list.map(item => (
			<TouchableOpacity
				onPress={() => onChange(item.value)}
				key={item.value}
			>
				<Text style={styles.element}>{item.text}</Text>
			</TouchableOpacity>
		))
	}, [list, onChange])

	return <ScrollView style={styles.container}>{elements}</ScrollView>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	element: {
		fontSize: 24,
		fontFamily: 'Montserrat-Medium',
		textAlign: 'left',
		color: '#FFF',
		marginVertical: 10,
		paddingHorizontal: 15,
	},
})

export default List
