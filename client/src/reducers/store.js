import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './index'

const getStore = () =>
	configureStore({
		reducer: rootReducer,
	})

export default getStore
