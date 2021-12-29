export function logger(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // =========================
      // console.log('store:', store)
      // console.log('next:', next)
      // console.log('action:', action)
      // =========================
      // if (action.type === 'task/updateTask') {
      //   return store.dispatch({type: 'task/deleteTask', payload: {...action.payload}})
      // }
      return next(action)
    }
  }
}
