import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {id: 1, title: 'Task 1', completed: false},
  {id: 2, title: 'Task 2', completed: false}
]

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask: (state, action) => {
      const idx = state.findIndex(i => i.id === action.payload.id)
      state[idx] = {...state[idx], ...action.payload}
    },
    deleteTask: (state, action) => {
      return state.filter(i => i.id !== action.payload.id)
    }
  }
})

const {actions, reducer} = slice
const {updateTask, deleteTask} = actions

export const taskCompleted = (id) => {
  return updateTask({id, completed: true})
}

export const titleChanged = (id) => {
  return updateTask({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return deleteTask({id})
}

export default reducer
