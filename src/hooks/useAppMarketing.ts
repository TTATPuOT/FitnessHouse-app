import { useCallback } from 'react'
import { useAppDispatch } from '@hooks/redux'
import { appLaunch } from '@slices/marketing'

const useAppMarketing = () => {
	const dispatch = useAppDispatch()

	const handleAppLaunch = useCallback(() => {
		dispatch(appLaunch())
	}, [dispatch])

	return { handleAppLaunch }
}

export default useAppMarketing
