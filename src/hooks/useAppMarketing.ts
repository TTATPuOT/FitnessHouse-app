import { useCallback } from 'react'
import { useAppDispatch } from '@hooks/redux'
import { appLaunch, hideRatingRequest } from '@slices/marketing'
import analytics from '@react-native-firebase/analytics'

const useAppMarketing = () => {
	const dispatch = useAppDispatch()

	const handleAppLaunch = useCallback(() => {
		dispatch(appLaunch())
	}, [dispatch])
	const handleHideRateRequest = useCallback(async () => {
		dispatch(hideRatingRequest())
		await analytics().logEvent('rateClick', { hide: true })
	}, [dispatch])

	return { handleAppLaunch, handleHideRateRequest }
}

export default useAppMarketing
