import supertest from 'supertest'

import app from '../app'

jest.mock('../models/todos')

describe('Given `todos` routes', () => {
	const request = supertest(app)

	describe('and a `GET /` endpoint', () => {
		it('should return the correct status', async () => {
			const response = await request.get('/todos')

			expect(response.status).toBe(200)
		})
	})

	describe('and a `POST /` endpoint', () => {
		it('should return the correct status', async () => {
			const response = await request.post('/todos')

			expect(response.status).toBe(200)
		})
	})

	describe('and a `PUT /:id` endpoint', () => {
		it('should return the correct status', async () => {
			const response = await request.put('/todos/abcd')

			expect(response.status).toBe(200)
		})
	})
})
