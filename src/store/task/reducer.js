// taskReducer
import * as actionTypes from './actionTypes'

export function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.taskUpdated: {
      const arr = [...state]
      const idx = arr.findIndex(i => i.id === action.payload.id)
      arr[idx] = {...arr[idx], ...action.payload}
      return arr
    }

    case actionTypes.taskDeleted: {
      return state.filter(i => i.id !== action.payload.id)
    }

    default:
      return state
  }
}
