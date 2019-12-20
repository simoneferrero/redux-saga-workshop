import React, { Profiler } from 'react'
import styled from 'styled-components/macro'

import Todos from 'components/Todos'
import { SPACING } from 'constants/index'

const onRenderCallback = (...args) => {
	if (args.id !== 'app') {
		return
	}

	console.log(args)
}

const StyledHeader = styled.header`
	align-items: center;
	display: flex;
	flex-direction: column;
	font-family: 'Limelight', cursive;
	height: ${SPACING.headerHeight}px;
	justify-content: center;
	position: fixed;
	top: 0;
	width: 100%;

	& h1 {
		font-size: 28px;
	}
`

const App = () => (
	<Profiler id="app" onRender={onRenderCallback}>
		<div>
			<StyledHeader>
				<h1>TODO List</h1>
			</StyledHeader>
			<Todos />
		</div>
	</Profiler>
)

export default App
