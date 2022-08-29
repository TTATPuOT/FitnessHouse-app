import React, { useCallback } from 'react'
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native'
import OfficeSelector from '@components/OfficeSelector'
import DateSelector from '@components/DateSelector'

export interface HomeHeaderProps {
	dates?: Date[]
	translateY: Animated.AnimatedInterpolation
	setHeaderHeight: (newValue: number) => void
}

const HomeHeader = ({
	dates,
	translateY,
	setHeaderHeight,
}: HomeHeaderProps) => {
	const handleLayout = useCallback(
		({ nativeEvent }: LayoutChangeEvent) => {
			setHeaderHeight(nativeEvent.layout.height)
		},
		[setHeaderHeight]
	)

	return (
		<Animated.View
			style={[styles.container, { transform: [{ translateY }] }]}
			onLayout={handleLayout}
		>
			<OfficeSelector />
			{!!dates && <DateSelector dates={dates} />}
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 1,
		left: 0,
		top: 0,
		width: '100%',
		backgroundColor: '#000',
		paddingBottom: 10,
		borderWidth: 2,
		borderBottomColor: '#333',
	},
})

export default HomeHeader
