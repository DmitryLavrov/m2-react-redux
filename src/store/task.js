
const TASK_UPDATED = 'task/updated'
const TASK_DELETED = 'task/deleted'

export const taskCompleted = (id) => {
  return {
    type: TASK_UPDATED,
    payload: {id, completed: true}
  }
}

export const titleChanged = (id) => {
  return {
    type: TASK_UPDATED,
    payload: {id, title: `New title for ${id}`}
  }
}

export const taskDeleted = (id) => {
  return {
    type: TASK_DELETED,
    payload: {id}
  }
}

function reducer(state = [], action) {
  switch (action.type) {
    case TASK_UPDATED: {
      const arr = [...state]
      const idx = arr.findIndex(i => i.id === action.payload.id)
      arr[idx] = {...arr[idx], ...action.payload}
      return arr
    }

    case TASK_DELETED: {
      return state.filter(i => i.id !== action.payload.id)
    }

    default:
      return state
  }
}

export default reducer
