import {createSlice} from '@reduxjs/toolkit'
import todosService from '../services/todosService'

const initialState = {entities: [], isLoading: true, error: null}

const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask(state, action) {
      const idx = state.entities.findIndex(i => i.id === action.payload.id)
      state.entities[idx] = {...state.entities[idx], ...action.payload}
    },
    deleteTask(state, action) {
      return state.entities.filter(i => i.id !== action.payload.id)
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
  }
})

const {actions, reducer} = slice
const {updateTask, deleteTask, received, taskRequested, taskRequestFailed} = actions

export const titleChanged = (id) => {
  return updateTask({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return deleteTask({id})
}

export const completeTask = id => (dispatch) => {
  dispatch(updateTask({id, completed: true}))
}

export const getTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    dispatch(received(data))
  } catch (err) {
    dispatch(taskRequestFailed(err.message))
  }
}

export default reducer
