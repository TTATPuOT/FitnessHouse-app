import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import React, { useEffect } from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import Home from '@screens/Home'
import OfficeList from '@screens/OfficeList'
import { SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import moment from 'moment'
import 'moment/locale/ru'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import Details from '@screens/Details'
import About from '@screens/About'
import SplashScreen from 'react-native-splash-screen'
import Filters from '@screens/Filters'
import { SelectProvider } from '@mobile-reality/react-native-select-pro'

moment.locale(['ru', 'en'])

const Stack = createStackNavigator()

const App = () => {
	useEffect(() => {
		SplashScreen.hide()
	}, [])

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SelectProvider>
					<SafeAreaView style={{ flex: 1 }}>
						<NavigationContainer theme={DarkTheme}>
							<Stack.Navigator initialRouteName='Home'>
								<Stack.Screen
									name='Home'
									component={Home}
									options={{
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name='OfficeList'
									component={OfficeList}
									options={{
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name='Details'
									//@ts-ignore
									component={Details}
									options={{
										title: 'Детали',
									}}
								/>
								<Stack.Screen
									name='Filters'
									component={Filters}
									options={{
										title: 'Фильтры',
									}}
								/>
								<Stack.Screen
									name='About'
									component={About}
									options={{
										title: 'Об авторе',
									}}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</SafeAreaView>
				</SelectProvider>
			</PersistGate>
		</Provider>
	)
}

export default App
