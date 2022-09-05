import React, { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'

type TagsTypes = 'paid' | 'section' | 'free'

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
	{
		type: 'free',
		text: 'БЕСПЛАТНО',
	},
]

export interface TagProps {
	type: TagsTypes
	checked?: boolean
}

const Tag = ({ type, checked }: TagProps) => {
	const currentType = useMemo<Type>(
		//@ts-ignore
		() => types.find(t => t.type === type),
		[type]
	)

	const stylesItems = useMemo(() => {
		const items = [styles.tag, styles[currentType.type]]

		if (checked) {
			// @ts-ignore
			items.push(styles.checked)
		}

		return items
	}, [currentType.type, checked])

	return (
		<Text style={stylesItems}>
			{!!checked && '✔ '}
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
		color: '#FFF',
	},
	checked: {},
	paid: {
		backgroundColor: '#FE6158',
	},
	section: {
		backgroundColor: '#FF9C33',
	},
	free: {
		backgroundColor: '#26b750',
	},
})

export default Tag
