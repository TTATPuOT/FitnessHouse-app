import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import dataReducer from '@slices/data'
import marketingReducer from '@slices/marketing'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PersistConfig } from 'redux-persist/es/types'

const rootPersistConfig: PersistConfig<any> = {
	key: 'root',
	blacklist: ['data'],
	storage: AsyncStorage,
}

const dataPersistConfig = {
	key: 'data',
	storage: AsyncStorage,
	whitelist: ['office', 'city'],
}

const rootReducer = combineReducers({
	data: persistReducer(dataPersistConfig, dataReducer),
	marketing: marketingReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
