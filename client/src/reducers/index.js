import { combineReducers } from 'redux'

import todosReducer from 'components/Todos/todosSlice'

export default combineReducers({
	todos: todosReducer,
})
