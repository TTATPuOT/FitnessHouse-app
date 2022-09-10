import { useNavigationContainerRef } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import analytics from '@react-native-firebase/analytics'

const useScreenAnalytics = () => {
	const routeNameRef = useRef<string>('')
	const navigationRef = useNavigationContainerRef()

	const handleReady = useCallback(() => {
		routeNameRef.current = navigationRef.getCurrentRoute()?.name ?? ''
	}, [])

	const handleStateChange = useCallback(async () => {
		const previousRouteName = routeNameRef.current
		const currentRouteName = navigationRef.getCurrentRoute()?.name ?? ''

		if (previousRouteName !== currentRouteName) {
			await analytics().logScreenView({
				screen_name: currentRouteName,
				screen_class: currentRouteName,
			})
		}
		routeNameRef.current = currentRouteName
	}, [])

	return { navigationRef, handleReady, handleStateChange }
}

export default useScreenAnalytics
