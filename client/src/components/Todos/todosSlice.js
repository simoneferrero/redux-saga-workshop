import { createSlice } from '@reduxjs/toolkit'

const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		error: '',
	},
	reducers: {
		addTodo: () => {},
		addTodoError: (state, { payload: { error } }) => {
			state.error = error
		},
		addTodoSuccess: (state, { payload }) => {
			state.items.push(payload)
			state.error = ''
		},
		getTodos: () => {},
		getTodosError: (state, { payload: { error } }) => {
			state.error = error
		},
		getTodosSuccess: (state, { payload: { todos } }) => {
			state.items = todos
			state.error = ''
		},
		toggleTodo: () => {},
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
	addTodo,
	addTodoError,
	addTodoSuccess,
	getTodos,
	getTodosError,
	getTodosSuccess,
	toggleTodo,
	toggleTodoError,
	toggleTodoSuccess,
} = todosSlice.actions

export default todosSlice.reducer
