import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import OfficesParser from '@utils/OfficesParser'
import List from '@components/List'
import { ListElement } from '@components/List/List'
import LoadingScreen from '@components/LoadingScreen'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { setOffice, setRegion } from '@slices/data'
import { useAppNavigation } from '@hooks/useAppNavigation'
import RegionsParser from '@utils/RegionsParser'
import selectRegion from '@src/selectors/selectRegion'
import analytics from '@react-native-firebase/analytics'

const OfficeList = () => {
	const dispatch = useAppDispatch()
	const navigation = useAppNavigation()

	const region = useAppSelector(selectRegion)

	const [regions, setRegions] = useState<RegionsParser>()
	const [offices, setOffices] = useState<OfficesParser>()
	const [isSelectRegion, setIsSelectRegion] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!regions) {
			setLoading(true)
			RegionsParser.getInstance().then(setRegions).then(() => setLoading(false))
		} else if (region) {
			setLoading(true)
			OfficesParser.getInstance(region).then(setOffices).then(() => setLoading(false))
		}
	}, [region, regions])

	const regionsList = useMemo<ListElement[]>(() => {
		if (!regions) return []

		return regions.getAll().map(region => ({
			text: region.name,
			value: region.code,
		}))
	}, [regions])
	const officesList = useMemo<ListElement[]>(() => {
		if (!offices) return []

		return offices.getAll().map(office => ({
			text: office.name,
			value: office.code,
		}))
	}, [offices])

	const handleChangeRegion = useCallback(
		async (regionCode: string) => {
			if (!regions) return

			const region = regions.getAll().find(o => o.code === regionCode)
			if (!region) return

			dispatch(setRegion(region))
			setIsSelectRegion(false)

			await analytics().logEvent('selectRegion', { name: region.name })
		},
		[dispatch, navigation, regions]
	)
	const handleChangeOffice = useCallback(
		async (officeCode: string) => {
			if (!offices) return

			const office = offices.getAll().find(o => o.code === officeCode)
			if (!office) return

			dispatch(setOffice(office))
			await analytics().logEvent('selectOffice', { office: office.name })
			
			navigation.goBack()
		},
		[dispatch, navigation, offices]
	)

	if (loading) return <LoadingScreen />

	if (!region || isSelectRegion) {
		return (
			<View style={styles.container}>
				<List list={regionsList} onChange={handleChangeRegion} />
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.header} onPress={() => setIsSelectRegion(true)}>
				<Text style={styles.headerText}>Регион: {region.name}</Text>
			</TouchableOpacity>
			<View style={styles.scroll}>
				<List list={officesList} onChange={handleChangeOffice} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		borderBottomColor: '#FFF',
		borderBottomWidth: 1
	},
	headerText: {
		textAlign: 'center',
		fontSize: 24,
		fontFamily: 'Montserrat-Medium',
		paddingVertical: 20,
		paddingHorizontal: 10,
		color: '#FFF',
		textDecorationLine: 'underline'
	},
	scroll: {
		flex: 1
	}
})

export default OfficeList
