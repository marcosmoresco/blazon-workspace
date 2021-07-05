import { combineReducers } from 'redux'
import { message } from './message'
import { theme } from './theme' 

export default combineReducers({
  message,
  theme
})