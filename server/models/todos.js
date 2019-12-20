import mongoose from 'mongoose'

export const transformTodo = ({ _id, text, completed }) => ({
	id: _id,
	text,
	completed,
})

const todoSchema = new mongoose.Schema({
	text: { type: String, required: true },
	completed: { type: Boolean, required: true },
})

export const Todo = mongoose.model('Todo', todoSchema)

export const getTodos = async () => {
	const todos = await Todo.find({})

	return todos.map((todo) => transformTodo(todo))
}

export const createTodo = async (text) => {
	const todo = new Todo({
		text,
		completed: false,
	})

	const savedTodo = await todo.save()

	return transformTodo(savedTodo)
}

export const updateTodo = async (id, completed) => {
	await Todo.updateOne({ _id: id }, { completed })

	const todo = await Todo.findById(id)

	return transformTodo(todo)
}
