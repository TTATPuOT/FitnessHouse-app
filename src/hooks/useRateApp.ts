import { useCallback } from 'react'
import Rate, { AndroidMarket } from 'react-native-rate'

const options = {
	GooglePackageName: 'ru.patriotovsky.fitnesshouse',
	OtherAndroidURL: '',
	preferredAndroidMarket: AndroidMarket.Google,
	preferInApp: false,
	openAppStoreIfInAppFails: true,
}

const useRateApp = () => {
	return useCallback(() => {
		return new Promise<void>((resolve, reject) => {
			Rate.rate(options, (success, errorMessage) => {
				if (success) resolve()
				if (errorMessage) reject(errorMessage)
			})
		})
	}, [])
}

export default useRateApp
