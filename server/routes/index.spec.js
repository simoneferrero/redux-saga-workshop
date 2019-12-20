import supertest from 'supertest'

import app from '../app'

describe('Given `index` routes', () => {
	const request = supertest(app)

	describe('and a `GET /` endpoint', () => {
		it('should return the correct status', async () => {
			const response = await request.get('/')

			expect(response.status).toBe(200)
		})
	})
})
