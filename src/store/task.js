import { createSlice, createAction } from '@reduxjs/toolkit'
import todosService from '../services/todosService'

const initialState = []

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
    },
    received: (state, action) => {
      return action.payload
    }
  }
})

const {actions, reducer} = slice
const {updateTask, deleteTask, received} = actions

const taskRequested = createAction('task/requested')
const taskRequestFailed = createAction('task/requestFailed')

export const titleChanged = (id) => {
  return updateTask({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return deleteTask({id})
}

export const completeTask = id => (dispatch, getState) => {
  dispatch(updateTask({id, completed: true}))
}

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    // =========================
    console.log('data:', data)
    // =========================
    dispatch(received(data))
  } catch (err) {
    dispatch(taskRequestFailed(err.message))
  }
}

export default reducer
