import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		error: '',
	},
	reducers: {
		addTodoError: (state, { payload: { error } }) => {
			state.error = error
		},
		addTodoSuccess: (state, { payload }) => {
			state.items.push(payload)
			state.error = ''
		},
		getTodosError: (state, { payload: { error } }) => {
			state.error = error
		},
		getTodosSuccess: (state, { payload: { todos } }) => {
			state.items = todos
			state.error = ''
		},
		toggleTodoError: (state, { payload: { error } }) => {
			state.error = error
		},
		toggleTodoSuccess: (state, { payload: { id, completed } }) => {
			const todo = state.items.find((todo) => todo.id === id)
			todo.completed = completed
			state.error = ''
		},
	},
})

export const {
	addTodoError,
	addTodoSuccess,
	getTodosError,
	getTodosSuccess,
	toggleTodoError,
	toggleTodoSuccess,
} = todosSlice.actions

export default todosSlice.reducer
