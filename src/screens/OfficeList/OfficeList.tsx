import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import OfficesParser from '@utils/OfficesParser'
import List from '@components/List'
import { ListElement } from '@components/List/List'
import LoadingScreen from '@components/LoadingScreen'
import { useAppDispatch } from '@hooks/redux'
import { setOffice } from '@slices/data'
import { useAppNavigation } from '@hooks/useAppNavigation'

const OfficeList = () => {
	const dispatch = useAppDispatch()
	const navigation = useAppNavigation()

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
			text: office.name,
			value: office.code,
		}))
	}, [offices])

	const handleChange = useCallback(
		(officeCode: string) => {
			if (!offices) return

			const office = offices.getAll().find(o => o.code === officeCode)
			if (!office) return

			dispatch(setOffice(office))
			navigation.goBack()
		},
		[dispatch, navigation, offices]
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
