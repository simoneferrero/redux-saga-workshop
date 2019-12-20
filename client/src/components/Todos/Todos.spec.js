import { wait } from '@testing-library/react'
import axios from 'axios'
import { Provider } from 'react-redux'

import getStore from 'reducers/store'
import Todos from './index'

describe('Given <Todos />', () => {
	const data = [
		{
			id: '1',
			completed: false,
			text: 'First todo',
		},
		{
			id: '2',
			completed: true,
			text: 'Second todo',
		},
	]
	const renderComponent = (props = {}) => {
		const renderedComponent = render(
			<Provider store={getStore()}>
				<Todos {...props} />
			</Provider>
		)
		const {
			findAllByTestId,
			getByTestId,
			getByPlaceholderText,
			getByText,
			getByLabelText,
		} = renderedComponent

		return {
			...renderedComponent,
			getTodosWrapper: () => getByTestId('todos'),
			getAllTodos: async () => await findAllByTestId(/(todo-)/i),
			getAddTodoInput: () => getByPlaceholderText(/Add TODO/i),
			getAddTodoButton: () => getByText(/ADD/i),
			getShowCompletedInput: () => getByLabelText(/(Show Completed:)/i),
		}
	}

	beforeEach(() => {
		axios.mockImplementation(() => new Promise((resolve) => resolve({ data })))
	})

	it('should NOT break if there is NO data', () => {
		axios.mockImplementation(
			() => new Promise((resolve, reject) => reject(new Error()))
		)

		const { getTodosWrapper } = renderComponent()

		expect(getTodosWrapper()).toBeInTheDocument()
	})

	it('should render correctly with data', async () => {
		const {
			getAllTodos,
			getTodosWrapper,
			getAddTodoInput,
			getAddTodoButton,
			getShowCompletedInput,
			findByText,
		} = renderComponent()
		const todos = await getAllTodos()
		const firstTodo = await findByText(data[0].text)
		const secondTodo = await findByText(data[1].text)

		expect(getTodosWrapper()).toBeInTheDocument()
		expect(todos.length).toBe(data.length)
		expect(getAddTodoInput()).toBeInTheDocument()
		expect(getAddTodoButton()).toBeInTheDocument()
		expect(getShowCompletedInput()).toBeInTheDocument()

		expect(firstTodo).not.toHaveStyle('color: #808080;')
		expect(firstTodo).not.toHaveStyle('text-decoration: line-through;')

		expect(secondTodo).toHaveStyle('color: #808080;')
		expect(secondTodo).toHaveStyle('text-decoration: line-through;')
	})

	it('should correctly add a new todo', async () => {
		const {
			getAddTodoInput,
			getAddTodoButton,
			getAllTodos,
			findByText,
		} = renderComponent()
		const newTodo = 'Some new thing'

		userEvent.type(getAddTodoInput(), newTodo)

		expect(getAddTodoInput()).toHaveValue(newTodo)

		axios.mockImplementation(
			() =>
				new Promise((resolve) =>
					resolve({
						data: { id: '3', text: newTodo, completed: false },
					})
				)
		)
		userEvent.click(getAddTodoButton())

		expect(getAddTodoInput()).toHaveValue('')

		const todos = await getAllTodos()
		const todo = await findByText(newTodo)
		expect(todos.length).toBe(3)
		expect(todo).toBeInTheDocument()
	})

	it('should NOT break if the input is empty and the user submits the form', async () => {
		const { getAddTodoButton, getAllTodos } = renderComponent()

		userEvent.click(getAddTodoButton())

		const todos = await getAllTodos()

		expect(todos.length).toBe(data.length)
	})

	it('should correctly toggle a todo', async () => {
		const { findByText } = renderComponent()
		const todo = await findByText(data[0].text)

		axios.mockImplementation(
			() =>
				new Promise((resolve) =>
					resolve({
						data: { ...data[0], completed: true },
					})
				)
		)
		userEvent.click(todo)

		const completedTodo = await findByText(data[0].text)

		expect(completedTodo).toHaveStyle('color: #808080;')
		expect(completedTodo).toHaveStyle('text-decoration: line-through;')
	})

	it('should NOT break if there are errors', async () => {
		const {
			getTodosWrapper,
			getAddTodoInput,
			getAddTodoButton,
			findByText,
		} = renderComponent()
		const todo = await findByText(data[0].text)

		axios.mockImplementation(
			() => new Promise((resolve, reject) => reject(new Error()))
		)
		userEvent.click(todo)

		userEvent.type(getAddTodoInput(), 'Some new thing')
		userEvent.click(getAddTodoButton())

		expect(getTodosWrapper()).toBeInTheDocument()
	})

	it('should NOT show complete todos if "Show Completed" is false', async () => {
		const { getAllTodos, getShowCompletedInput } = renderComponent()

		userEvent.click(getShowCompletedInput())

		const todos = await getAllTodos()

		expect(todos.length).toEqual(1)
	})
})
