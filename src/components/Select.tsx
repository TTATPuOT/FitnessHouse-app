import React from 'react'
import {
	OptionsType,
	Select as BaseSelect,
} from '@mobile-reality/react-native-select-pro'
import { StyleSheet } from 'react-native'

export interface SelectProps {
	options: OptionsType
}

const Select = ({ options }: SelectProps) => {
	return (
		<BaseSelect
			options={options}
			placeholderText='Сделайте выбор'
			closeDropdownOnSelect={false}
			multiSelection
			animated
			selectControlTextStyle={styles.selectControlTextStyle}
			optionTextStyle={styles.optionTextStyle}
			optionSelectedStyle={styles.optionSelectedStyle}
			multiSelectionOptionStyle={styles.multiSelectionOptionStyle}
		/>
	)
}

const styles = StyleSheet.create({
	selectControlTextStyle: {
		fontSize: 14,
		fontFamily: 'Montserrat-Medium',
	},
	optionTextStyle: {
		fontSize: 16,
		fontFamily: 'Montserrat-Medium',
	},
	optionSelectedStyle: {
		backgroundColor: '#DDD',
	},
	multiSelectionOptionStyle: {
		backgroundColor: '#DDD',
		color: '#FFF',
		borderWidth: 0,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default Select
