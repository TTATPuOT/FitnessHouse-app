import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import TimeBlock from '@components/Schedule/TimeBlock'
import { Column } from '@utils/ScheduleParser'

export interface ScheduleProps {
	column: Column
}

const Schedule = ({ column }: ScheduleProps) => {
	const timeBlocks = useMemo<JSX.Element[]>(() => {
		const blocks: JSX.Element[] = []

		for (const period of column.timePeriods) {
			blocks.push(<TimeBlock key={period.time} period={period} />)
		}

		return blocks
	}, [column.timePeriods])

	return <View style={styles.container}>{timeBlocks}</View>
}

const styles = StyleSheet.create({
	container: {},
})

export default Schedule
