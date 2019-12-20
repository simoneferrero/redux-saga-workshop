import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Todo from './Todo'
import TodoForm from './TodoForm'
import { addTodo, getTodos, toggleTodo } from './todosSlice'
import { StyledLabel, StyledPaper, StyledWrapper } from './styled'

const Todos = () => {
	const [showCompleted, setShowCompleted] = useState(true)
	const dispatch = useDispatch()
	const handleSubmitTodo = (text) => dispatch(addTodo({ text }))
	const handleToggleTodo = (id, completed) =>
		dispatch(toggleTodo({ id, completed }))

	useEffect(() => {
		dispatch(getTodos())
	}, [dispatch])

	const todos = useSelector(({ todos }) => todos.items)

	return (
		<StyledWrapper data-testid="todos">
			<TodoForm handleSubmit={handleSubmitTodo} />
			<StyledLabel htmlFor="showCompleted">
				Show Completed:{' '}
				<input
					checked={showCompleted}
					id="showCompleted"
					onChange={() => setShowCompleted(!showCompleted)}
					type="checkbox"
				/>
			</StyledLabel>
			<StyledPaper>
				{todos.map(
					(todo) =>
						(showCompleted || !todo.completed) && (
							<Todo handleClick={handleToggleTodo} key={todo.id} {...todo} />
						)
				)}
			</StyledPaper>
		</StyledWrapper>
	)
}

export default Todos
