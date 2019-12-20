import { createError } from './errors'

describe('Given `createError`', () => {
	const json = jest.fn()
	const res = {
		status: jest.fn(() => ({
			json,
		})),
	}
	const next = jest.fn()
	const message = 'Some error'

	beforeEach(() => {
		createError(res, next, message)
	})

	it('should correctly set the status to 500', () => {
		expect(res.status).toHaveBeenCalledWith(500)
	})

	it('should correctly return the error message as json', () => {
		expect(json).toHaveBeenCalledWith({ error: message })
	})

	it('should correctly call the next middleware with the error', () => {
		expect(next).toHaveBeenCalledWith('There was an error: ' + message)
	})
})
