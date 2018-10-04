import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"

import sagas from "./sagas"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
}

let store = null
let persistor = null

export function initStore(reducer, preloadedState={}) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    sagaMiddleware
  ]

  const persistedReducer = persistReducer(persistConfig, reducer)
  store = createStore(persistedReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
  persistor = persistStore(store)

  sagaMiddleware.run(sagas)

  return {
    store,
    persistor
  }
}

export function getStore() {
  return store
}
