import * as Models from '../models/todos'
import { createError } from '../helpers/errors'

export const getTodos = async (req, res, next) => {
	try {
		const todos = await Models.getTodos()

		res.status(200).json(todos)
	} catch ({ message }) {
		createError(res, next, message)
	}
}

export const postTodo = async ({ body: { text } }, res, next) => {
	try {
		const todo = await Models.createTodo(text)

		res.status(200).json(todo)
	} catch ({ message }) {
		createError(res, next, message)
	}
}

export const putTodo = async (
	{ body: { completed }, params: { id } },
	res,
	next
) => {
	try {
		const todo = await Models.updateTodo(id, completed)

		res.status(200).json(todo)
	} catch ({ message }) {
		createError(res, next, message)
	}
}
