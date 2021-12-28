// createStore
export function createStore(taskReducer, initialState) {
  let state = initialState
  const listeners = []

  function getState() {
    return state
  }

  function dispatch(action) {
    state = taskReducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }

  function subscribe(listener) {
    listeners.push(listener)
  }

  return {getState, dispatch, subscribe}
}
