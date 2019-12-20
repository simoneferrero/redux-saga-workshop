import Todo from './index'

describe('Given <Todo />', () => {
	it('should render correctly', () => {
		const props = {
			completed: false,
			handleClick: jest.fn(),
			id: '12345',
			text: 'Some Todo',
		}
		const { container } = render(<Todo {...props} />)

		expect(container.firstChild).toMatchSnapshot()
	})
})
