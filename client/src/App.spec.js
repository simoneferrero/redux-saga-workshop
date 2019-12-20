import axios from 'axios'
import { Provider } from 'react-redux'

import App from './App'
import getStore from 'reducers/store'

describe('Given <App />', () => {
	beforeEach(() => {
		axios.mockImplementation(
			() => new Promise((resolve) => resolve({ data: [] }))
		)
	})

	it('should render correctly', () => {
		const { getByTestId, getByText } = render(
			<Provider store={getStore()}>
				<App />
			</Provider>
		)
		const Header = getByText(/TODO List/i)
		const Todos = getByTestId('todos')

		expect(Header).toBeInTheDocument()
		expect(Todos).toBeInTheDocument()
	})
})
