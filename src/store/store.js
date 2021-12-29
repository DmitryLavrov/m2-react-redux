import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './task'
import { logger } from './middleware/logger'
import { thunk } from './middleware/thunk'

const middlewareEnhancer = applyMiddleware(logger, thunk)

function configureStore() {
  return createStore(reducer,
    compose(middlewareEnhancer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
}

export default configureStore
