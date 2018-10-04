import 'react-app-polyfill/ie11'
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from 'redux-persist/integration/react'

import reducer from "./reducers"
import { initStore } from "./store"
import router from "./router"
import { Application } from "./components"
import { MainTemplate } from "./components"

import "font-awesome/css/font-awesome.min.css"
import "./styles/style.css"

const { store, persistor } = initStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Application>
          <MainTemplate>
            {router}
          </MainTemplate>
        </Application>
      </BrowserRouter>
    </PersistGate>
  </Provider>, document.getElementById("root"))
