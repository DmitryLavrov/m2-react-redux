import {createSlice} from '@reduxjs/toolkit'
import todosService from '../services/todosService'
import {setError} from './errors'

const initialState = {entities: [], isLoading: true}

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    updateTask(state, action) {
      const idx = state.entities.findIndex(i => i.id === action.payload.id)
      state.entities[idx] = {...state.entities[idx], ...action.payload}
    },
    deleteTask(state, action) {
      state.entities = state.entities.filter(i => i.id !== action.payload.id)
    },
    received(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    taskRequested(state) {
      state.isLoading = true
    },
    taskRequestFailed(state) {
      state.isLoading = false
    },
    created(state, action) {
      console.log('created(state, action)', state, action)
      state.entities.push(action.payload)
      state.isLoading = false
    }
  }
})

const {actions, reducer: taskReducer} = taskSlice
const {updateTask, deleteTask, received, taskRequested, taskRequestFailed, created} = actions

export const titleChanged = (id) => {
  return updateTask({id, title: `New title for ${id}`})
}

export const taskDeleted = (id) => {
  return deleteTask({id})
}

export const completeTask = id => (dispatch) => {
  dispatch(updateTask({id, completed: true}))
}

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.fetch()
    console.log('loadTask - data', data)
    dispatch(received(data))
  } catch (err) {
    dispatch(taskRequestFailed())
    dispatch(setError(err.message))
  }
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.loading


export const taskCreated = (task) => {
  return createTask(task)
}
export const createTask = (task) => async (dispatch) => {
  dispatch(taskRequested())
  try {
    const data = await todosService.post(task)
    dispatch(created(data))
  } catch (err) {
    dispatch(taskRequestFailed())
    dispatch(setError(err.message))
  }
}

export default taskReducer
