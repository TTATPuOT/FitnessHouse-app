import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

type TagsTypes = 'paid' | 'section'

interface Type {
	type: TagsTypes
	text: string
}

const types: Type[] = [
	{
		type: 'paid',
		text: 'ПЛАТНО',
	},
	{
		type: 'section',
		text: 'СЕКЦИЯ',
	},
]

export interface TagProps {
	type: TagsTypes
}

const Tag = ({ type }: TagProps) => {
	const currentType = useMemo<Type>(
		//@ts-ignore
		() => types.find(t => t.type === type),
		[type]
	)

	return (
		<Text style={[styles.tag, styles[currentType.type]]}>
			{currentType.text}
		</Text>
	)
}

const styles = StyleSheet.create({
	tag: {
		fontFamily: 'Montserrat-Bold',
		fontSize: 10,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 10,
		marginLeft: 10,
	},
	paid: {
		backgroundColor: '#FE6158',
	},
	section: {
		backgroundColor: '#FF9C33',
	},
})

export default Tag
