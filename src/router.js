import React from "react"
import { Switch } from "react-router"

import {
  AuthenticatedRoute,
  UnauthenticatedRoute
} from "./containers"
import {
  IdeasListPage,
  LoginPage,
  RegisterPage
} from "./pages"

const router = () => (
  <Switch>
    <AuthenticatedRoute   component={IdeasListPage} path="/ideas-list" />
    <UnauthenticatedRoute component={RegisterPage}  path="/register" />
    <UnauthenticatedRoute component={LoginPage}     path="/login" />
    <UnauthenticatedRoute component={LoginPage} />
  </Switch>
)

export default router
