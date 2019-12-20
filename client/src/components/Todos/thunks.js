import axios from 'axios'

import { API } from 'constants/index'
import {
	addTodoError,
	addTodoSuccess,
	getTodosError,
	getTodosSuccess,
	toggleTodoError,
	toggleTodoSuccess,
} from './todosSlice'

export const getTodos = () => async (dispatch) => {
	try {
		const { data } = await axios(`${API}todos`)

		dispatch(getTodosSuccess({ todos: data }))
	} catch ({ message }) {
		dispatch(getTodosError({ error: message }))
	}
}

export const addTodo = (text) => async (dispatch) => {
	try {
		const { data } = await axios(`${API}todos`, {
			data: { text },
			method: 'POST',
		})

		dispatch(addTodoSuccess(data))
	} catch ({ message }) {
		dispatch(addTodoError({ error: message }))
	}
}

export const toggleTodo = (id, completed) => async (dispatch) => {
	try {
		const { data } = await axios(`${API}todos/${id}`, {
			data: { completed },
			method: 'PUT',
		})

		dispatch(toggleTodoSuccess(data))
	} catch ({ message }) {
		dispatch(toggleTodoError({ error: message }))
	}
}
