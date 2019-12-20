import createSagaMiddleware from 'redux-saga'
import { all, call } from 'redux-saga/effects'

import todoSaga from 'components/Todos/sagas'

export const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga() {
	yield all([call(todoSaga)])
}
