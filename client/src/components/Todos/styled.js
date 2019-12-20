import styled from 'styled-components/macro'

import { SPACING } from 'constants/index'

export const StyledWrapper = styled.div`
	display: grid;
	grid-gap: ${SPACING.base}px;
	grid-template-columns: 1fr;
	justify-items: center;
	margin: 0 auto;
	margin-top: ${SPACING.headerHeight}px;
	padding: ${SPACING.base}px;
	max-width: 500px;
`

export const StyledLabel = styled.label`
	font-size: 12px;
`

export const StyledPaper = styled.div`
	background-color: #fff;
	border-radius: ${SPACING.half}px;
	border-top-right-radius: 0px;
	border-bottom-left-radius: 0px;
	color: #000;
	padding: ${SPACING.half}px 0px;
	width: 100%;
`
