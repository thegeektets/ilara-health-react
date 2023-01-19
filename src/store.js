import { createStore, combineReducers } from 'redux'
import authReducer from './auth/reducers/authReducer'
import navReducer from './reducers/navigationReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer
})

const store = createStore(rootReducer)

export default store;
