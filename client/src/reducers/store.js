import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './index'
import rootSaga, { sagaMiddleware } from 'sagas'

const getStore = () => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: [sagaMiddleware],
	})

	sagaMiddleware && sagaMiddleware.run(rootSaga)

	return store
}

export default getStore
