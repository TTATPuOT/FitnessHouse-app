import React, { useEffect } from 'react'
import useAppMarketing from '@src/hooks/useAppMarketing'

const AppLaunchHandler = () => {
	const { handleAppLaunch } = useAppMarketing()

	useEffect(() => {
		handleAppLaunch()
	}, [])

	return null
}

export default AppLaunchHandler
