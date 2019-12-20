import * as Controllers from './todos'
import * as Models from '../models/todos'
import { createError } from '../helpers/errors'

jest.mock('../models/todos', () => ({
	getTodos: jest.fn(
		() =>
			new Promise((resolve) =>
				resolve([{ id: '1', text: 'Some Text', completed: false }])
			)
	),
	createTodo: jest.fn(
		() =>
			new Promise((resolve) =>
				resolve({
					id: '1',
					text: 'Some Text',
					completed: false,
				})
			)
	),
	updateTodo: jest.fn(
		() =>
			new Promise((resolve) =>
				resolve({
					id: '1',
					text: 'Some Text',
					completed: true,
				})
			)
	),
}))
jest.mock('../helpers/errors')

describe('Given todos controllers', () => {
	const json = jest.fn()
	const res = {
		status: jest.fn(() => ({
			json,
		})),
	}
	const next = jest.fn()

	describe('and `getTodos`', () => {
		describe('When successful', () => {
			beforeEach(async () => {
				await Controllers.getTodos(undefined, res, next)
			})

			it('should set a 200 status', () => {
				expect(res.status).toHaveBeenCalledWith(200)
			})

			it('should return the todos', () => {
				expect(json).toHaveBeenCalledWith([
					{ id: '1', text: 'Some Text', completed: false },
				])
			})
		})

		describe('When NOT successful', () => {
			beforeEach(async () => {
				Models.getTodos.mockImplementation(
					() =>
						new Promise((resolve, reject) =>
							reject(new Error('There was an error'))
						)
				)
				await Controllers.getTodos(undefined, res, next)
			})

			it('should NOT set a 200 status', () => {
				expect(res.status).not.toHaveBeenCalledWith(200)
			})

			it('should NOT return the todos', () => {
				expect(json).not.toHaveBeenCalledWith([
					{ id: '1', text: 'Some Text', completed: false },
				])
			})

			it('should create an error', () => {
				expect(createError).toHaveBeenCalledWith(
					res,
					next,
					'There was an error'
				)
			})
		})
	})

	describe('and `postTodo`', () => {
		const req = {
			body: {
				text: 'Some Text',
			},
		}

		describe('When successful', () => {
			beforeEach(async () => {
				await Controllers.postTodo(req, res, next)
			})

			it('should set a 200 status', () => {
				expect(res.status).toHaveBeenCalledWith(200)
			})

			it('should return the todos', () => {
				expect(json).toHaveBeenCalledWith({
					id: '1',
					text: 'Some Text',
					completed: false,
				})
			})
		})

		describe('When NOT successful', () => {
			beforeEach(async () => {
				Models.createTodo.mockImplementation(
					() =>
						new Promise((resolve, reject) =>
							reject(new Error('There was an error'))
						)
				)
				await Controllers.postTodo(req, res, next)
			})

			it('should NOT set a 200 status', () => {
				expect(res.status).not.toHaveBeenCalledWith(200)
			})

			it('should NOT return the todos', () => {
				expect(json).not.toHaveBeenCalledWith([
					{ id: '1', text: 'Some Text', completed: false },
				])
			})

			it('should create an error', () => {
				expect(createError).toHaveBeenCalledWith(
					res,
					next,
					'There was an error'
				)
			})
		})
	})

	describe('and `putTodo`', () => {
		const req = {
			body: {
				text: 'Some Text',
			},
			params: {
				id: '1',
			},
		}

		describe('When successful', () => {
			beforeEach(async () => {
				await Controllers.putTodo(req, res, next)
			})

			it('should set a 200 status', () => {
				expect(res.status).toHaveBeenCalledWith(200)
			})

			it('should return the todos', () => {
				expect(json).toHaveBeenCalledWith({
					id: '1',
					text: 'Some Text',
					completed: true,
				})
			})
		})

		describe('When NOT successful', () => {
			beforeEach(async () => {
				Models.updateTodo.mockImplementation(
					() =>
						new Promise((resolve, reject) =>
							reject(new Error('There was an error'))
						)
				)
				await Controllers.putTodo(req, res, next)
			})

			it('should NOT set a 200 status', () => {
				expect(res.status).not.toHaveBeenCalledWith(200)
			})

			it('should NOT return the todos', () => {
				expect(json).not.toHaveBeenCalledWith([
					{ id: '1', text: 'Some Text', completed: false },
				])
			})

			it('should create an error', () => {
				expect(createError).toHaveBeenCalledWith(
					res,
					next,
					'There was an error'
				)
			})
		})
	})
})
