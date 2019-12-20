import mongoose from 'mongoose'
import * as Model from './todos'

const setupDB = async (dbName) => {
	const DB_HOST = `mongodb://localhost:27017/${dbName}`
	await mongoose.connect(DB_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
}

const clearDB = () => {
	Object.values(mongoose.connection.collections).forEach(async (collection) => {
		await collection.deleteMany()
	})
}

describe('Given todos models', () => {
	const text = 'Some text'

	beforeAll(async () => {
		await setupDB('todos-model')
	})

	afterAll(() => {
		clearDB()
	})

	describe('and `getTodos`', () => {
		it('should return the existing todos', async () => {
			const newTodo = new Model.Todo({ text, completed: false })
			const { _id } = await newTodo.save()
			const result = await Model.getTodos()
			const expectedResult = [{ id: _id, text, completed: false }]

			expect(result).toEqual(expectedResult)
		})
	})

	describe('and `createTodo`', () => {
		it('should return a new todo', async () => {
			const result = await Model.createTodo(text)

			expect(result.id).not.toBeUndefined()
			expect(result.text).toEqual(text)
			expect(result.completed).toBe(false)
		})
	})

	describe('and `updateTodo`', () => {
		it('should modify an existing todo', async () => {
			const newTodo = new Model.Todo({ text, completed: false })
			const { _id } = await newTodo.save()
			const result = await Model.updateTodo(_id, true)
			const expectedResult = { id: _id, text, completed: true }

			expect(result).toEqual(expectedResult)
		})
	})
})
