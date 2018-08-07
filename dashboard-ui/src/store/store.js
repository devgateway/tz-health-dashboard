import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createHashHistory'
import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import Immutable from 'immutable';
// ---------------------------------

export const history = createHistory()
const initialState =Immutable.Map({})
const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers
  })
}

const store = createStore(
  makeRootReducer(),
  initialState,
  composedEnhancers
)

store.asyncReducers = {};
//store.unsubscribeHistory = hashHistory.listen(updateLocation(store))


export const injectReducer = ({ key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
  store.dispatch({type:'NONE'})
}


export default store
