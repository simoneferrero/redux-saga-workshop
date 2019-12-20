export const createError = (res, next, message) => {
	res.status(500).json({ error: message })
	next('There was an error: ' + message)
}
