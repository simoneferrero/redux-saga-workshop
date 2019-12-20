import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components/macro'
import { Provider } from 'react-redux'

import App from 'App'
import getStore from 'reducers/store'
import { COLORS } from 'constants/index'

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
	}

	body {
		background-color: ${COLORS.mainDark};
		color: ${COLORS.mainLight};
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	p {
		margin: 0;
	}
`

ReactDOM.render(
	<Provider store={getStore()}>
		<GlobalStyle />
		<App />
	</Provider>,
	document.getElementById('root')
)
