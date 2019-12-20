import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'

import { API } from 'constants/index'
import {
	addTodo,
	addTodoError,
	addTodoSuccess,
	getTodos,
	getTodosError,
	getTodosSuccess,
	toggleTodo,
	toggleTodoError,
	toggleTodoSuccess,
} from './todosSlice'

export function* addTodoSaga({ payload: { text } }) {
	try {
		const { data } = yield call(axios, `${API}todos`, {
			data: { text },
			method: 'POST',
		})

		yield put(addTodoSuccess(data))
	} catch ({ message }) {
		yield put(addTodoError({ error: message }))
	}
}

export function* addTodoWatcher() {
	yield takeLatest(addTodo.type, addTodoSaga)
}

export function* getTodosSaga() {
	try {
		const { data } = yield call(axios, `${API}todos`)

		yield put(getTodosSuccess({ todos: data }))
	} catch ({ message }) {
		yield put(getTodosError({ error: message }))
	}
}

export function* getTodosWatcher() {
	yield takeLatest(getTodos.type, getTodosSaga)
}

export function* toggleTodoSaga({ payload: { id, completed } }) {
	try {
		const { data } = yield call(axios, `${API}todos/${id}`, {
			data: { completed },
			method: 'PUT',
		})

		yield put(toggleTodoSuccess(data))
	} catch ({ message }) {
		yield put(toggleTodoError({ error: message }))
	}
}

export function* toggleTodoWatcher() {
	yield takeLatest(toggleTodo.type, toggleTodoSaga)
}

export default function* rootSaga() {
	yield all([
		call(addTodoWatcher),
		call(getTodosWatcher),
		call(toggleTodoWatcher),
	])
}
