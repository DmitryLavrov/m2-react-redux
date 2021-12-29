import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import { taskCompleted, taskDeleted, titleChanged, completeTask } from './store/task'

const store = configureStore()

// App
const App = () => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    store.subscribe(() => {
        setState(store.getState())
      }
    )
  }, [])

  // const completeTask = (id) => {
  //   store.dispatch((dispatch, getState) => {
  //     // =========================
  //     console.log('dispatch:', dispatch)
  //     console.log('getState:', getState)
  //     // =========================
  //     store.dispatch(taskCompleted(id))
  //   })
  // }

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
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)
