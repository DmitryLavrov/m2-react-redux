import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import {taskDeleted, titleChanged, completeTask, getTasks} from './store/task'
import {Provider, useSelector} from 'react-redux'

const store = configureStore()

// App
const App = () => {
  const state = useSelector(state => state)

  useEffect(() => {
    store.dispatch(getTasks())
  }, [])

  const changeTitle = (id) => {
    store.dispatch(titleChanged(id))
  }

  const deleteTask = (id) => {
    store.dispatch(taskDeleted(id))
  }

  return (
    <>
      <h1>APP</h1>
      <ul>
        {state.map(s =>
          <li key={s.id}>{<>
            <p>{s.title + ' ' + s.completed}</p>
            <button onClick={() => store.dispatch(completeTask(s.id))}>
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
