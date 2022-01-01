import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Provider, useDispatch, useSelector} from 'react-redux'

import configureStore from './store/store'
import {taskDeleted, titleChanged, completeTask, getTasks, loadTasks, getTasksLoadingStatus} from './store/task'
import {getError} from './store/errors'

const store = configureStore()

// App
const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  console.log('state:', state)
  useEffect(() => {
    dispatch(loadTasks())
  }, [])

  const changeTitle = (id) => {
    dispatch(titleChanged(id))
  }

  const deleteTask = (id) => {
    dispatch(taskDeleted(id))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>APP</h1>
      <ul>
        {state.map(s =>
          <li key={s.id}>{<>
            <p>{s.title + ' ' + s.completed}</p>
            <button onClick={() => dispatch(completeTask(s.id))}>
              Complete
            </button>
            <button onClick={() => changeTitle(s.id)}>
              Title
            </button>
            <button onClick={() => deleteTask(s.id)}>
              Delete
            </button>
          </>}
          </li>)}
      </ul>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
