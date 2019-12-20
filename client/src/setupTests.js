import React from 'react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('axios')

global.React = React
global.userEvent = userEvent
global.render = render

global.afterEach(() => {
	jest.clearAllMocks()
})
global.afterAll(() => {
	jest.resetAllMocks()
})
