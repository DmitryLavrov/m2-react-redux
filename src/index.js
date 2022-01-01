import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import {taskDeleted, titleChanged, completeTask, getTasks} from './store/task'
import {Provider, useDispatch, useSelector} from 'react-redux'

const store = configureStore()

// App
const App = () => {
  const state = useSelector(state => state.entities)
  const isLoading = useSelector(state => state.isLoading)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTasks())
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
              Push
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
