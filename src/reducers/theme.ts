import { 
  CHANGE_THEME
} from '../actions/actionTypes'

const initialState = {
  current: 'default'
}

export type ThemeActionType = {  
  theme: string 
  type: string
}

export const theme = (state = initialState, action:ThemeActionType) => {
  
  switch (action.type) {   
    case CHANGE_THEME: {

      return {
        ...state,
        action
      } 
    }       
    default:
      return state
  }
}