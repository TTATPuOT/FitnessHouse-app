import { useCallback } from 'react'
import { useAppDispatch } from '@hooks/redux'
import { appLaunch, hideRatingRequest } from '@slices/marketing'

const useAppMarketing = () => {
	const dispatch = useAppDispatch()

	const handleAppLaunch = useCallback(() => {
		dispatch(appLaunch())
	}, [dispatch])
	const handleHideRateRequest = useCallback(() => {
		dispatch(hideRatingRequest())
	}, [dispatch])

	return { handleAppLaunch, handleHideRateRequest }
}

export default useAppMarketing
