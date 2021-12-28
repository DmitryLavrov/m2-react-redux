import { createAction } from '@reduxjs/toolkit'

const updateTask = createAction('task/updated')
const deleteTask = createAction('task/deleted')

export const taskCompleted = (id) => {
  return updateTask({id, completed: true})
}

export const titleChanged = (id) => {
  return updateTask({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return deleteTask({id})
}

function reducer(state = [], action) {
  switch (action.type) {
    case updateTask.type: {
      const arr = [...state]
      const idx = arr.findIndex(i => i.id === action.payload.id)
      arr[idx] = {...arr[idx], ...action.payload}
      return arr
    }

    case deleteTask.type: {
      return state.filter(i => i.id !== action.payload.id)
    }

    default:
      return state
  }
}

export default reducer
