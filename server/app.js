import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import path from 'path'

import indexRouter from './routes/index'
import todosRouter from './routes/todos'

export const PORT = process.env.PORT || '7000'
const DB_HOST = 'mongodb://redux-saga-workshop-db/redux-saga-workshop'

const app = express()

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })

app.set('port', PORT)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(
	logger('dev', {
		stream: logger.stream,
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use('/', indexRouter)
app.use('/todos', todosRouter)

export default app
