import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'

import reducer from "./reducers"
import { initStore } from "./store"
import router from "./router"
import { MainTemplate } from "./components"

import "font-awesome/css/font-awesome.min.css"
import "./styles/style.css"

const { store, persistor } = initStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MainTemplate>
          {router}
        </MainTemplate>
      </BrowserRouter>
    </PersistGate>
  </Provider>, document.getElementById("root"))
