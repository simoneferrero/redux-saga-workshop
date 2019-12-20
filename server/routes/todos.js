import express from 'express'

import * as Controller from '../controllers/todos'

const router = express.Router()

router.get('/', Controller.getTodos)

router.post('/', Controller.postTodo)

router.put('/:id', Controller.putTodo)

export default router
