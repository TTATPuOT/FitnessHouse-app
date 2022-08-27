import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import OfficesParser from '@utils/OfficesParser'
import List from '@components/List'
import { ListElement } from '@components/List/List'
import LoadingScreen from '@components/LoadingScreen'
import { useAppDispatch } from '@hooks/redux'
import { setOffice } from '@slices/data'
import { useNavigation } from '@react-navigation/native'

const OfficeList = () => {
	const dispatch = useAppDispatch()
	const navigation = useNavigation()

	const [offices, setOffices] = useState<OfficesParser>()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!offices) {
			OfficesParser.getInstance().then(o => {
				setOffices(o)
				setLoading(false)
			})
		}
	}, [offices])

	const list = useMemo<ListElement[]>(() => {
		if (!offices) return []

		return offices.getAll().map(office => ({
			text: office,
			value: office,
		}))
	}, [offices])

	const handleChange = useCallback(
		(officeName: string) => {
			dispatch(setOffice(officeName))
			navigation.goBack()
		},
		[dispatch, navigation]
	)

	if (loading) return <LoadingScreen />

	return (
		<ScrollView style={styles.container}>
			<List list={list} onChange={handleChange} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default OfficeList
