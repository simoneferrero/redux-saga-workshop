import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import { SPACING } from 'constants/index'

const StyledTodo = styled.button`
	background-color: inherit;
	border: none;
	color: ${({ completed }) => completed && '#808080'};
	cursor: pointer;
	font-family: 'Nanum Pen Script', cursive;
	font-size: 24px;
	margin-bottom: ${SPACING.half}px;
	padding: ${SPACING.half}px ${SPACING.base}px;
	text-align: left;
	text-decoration: ${({ completed }) => completed && 'line-through'};
	transition: box-shadow 0.3s ease-in-out, color 0.3s ease-in-out,
		transform 0.3s ease-in-out;
	width: 100%;
	will-change: transform;

	:hover {
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
		transform: translate(5px, -5px) scale(1.01);
	}
`

const Todo = ({ completed, handleClick, id, text }) => (
	<StyledTodo
		data-testid={`todo-${id}`}
		completed={completed}
		onClick={() => handleClick(id, !completed)}
	>
		{text}
	</StyledTodo>
)

Todo.propTypes = {
	completed: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
}

export default Todo
