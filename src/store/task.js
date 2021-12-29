import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = [
  {id: 1, title: 'Task 1', completed: false},
  {id: 2, title: 'Task 2', completed: false}
]

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

const reducer = createReducer(initialState, builder => {
  builder.addCase(updateTask, (state, action) => {
    const idx = state.findIndex(i => i.id === action.payload.id)
    state[idx] = {...state[idx], ...action.payload}
  }).addCase(deleteTask, (state, action) => {
    return state.filter(i => i.id !== action.payload.id)
  })
})

export default reducer
