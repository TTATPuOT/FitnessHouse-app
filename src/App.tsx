import 'react-native-gesture-handler'
import React from 'react'
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

moment.locale(['ru', 'en'])

const Drawer = createStackNavigator()

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<SafeAreaView style={{ flex: 1 }}>
					<NavigationContainer theme={DarkTheme}>
						<Drawer.Navigator
							initialRouteName='Home'
							screenOptions={{ headerShown: false }}
						>
							<Drawer.Screen name='Home' component={Home} />
							<Drawer.Screen
								name='OfficeList'
								component={OfficeList}
							/>
						</Drawer.Navigator>
					</NavigationContainer>
				</SafeAreaView>
			</PersistGate>
		</Provider>
	)
}

export default App
