import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { COLORS, SPACING } from '../../../constants/index'

const StyledForm = styled.form`
	display: flex;
	width: 100%;
`

const StyledInput = styled.input`
	border-radius: ${SPACING.half}px 0px 0px ${SPACING.half}px;
	border: none;
	box-sizing: border-box;
	height: 40px;
	padding: ${SPACING.base}px;
	width: 100%;
`

const StyledButton = styled.button`
	background-color: ${COLORS.accent};
	border-radius: 0px 8px 8px 0px;
	border: 0px;
	box-sizing: border-box;
	color: ${COLORS.accentText};
	cursor: pointer;
	height: 40px;
	padding: ${SPACING.base};
`

const TodoForm = ({ handleSubmit }) => {
	const [newTodo, setNewTodo] = useState('')
	const onSubmit = (event) => {
		event.preventDefault()

		if (!!newTodo) {
			handleSubmit(newTodo)
			setNewTodo('')
		}
	}

	return (
		<StyledForm onSubmit={onSubmit}>
			<StyledInput
				onChange={({ target: { value } }) => setNewTodo(value)}
				placeholder="Add TODO"
				value={newTodo}
			/>
			<StyledButton type="submit">ADD</StyledButton>
		</StyledForm>
	)
}

TodoForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
}

export default TodoForm
