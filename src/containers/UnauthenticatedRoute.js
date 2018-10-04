import React from "react"
import { connect } from "react-redux"
import { Redirect, Route } from "react-router"

import { isAuthenticatedSelector } from "../selectors"

const DEFAULT_PAGE = "/ideas-list"

const UnauthenticatedRoute = ({component: Component, isAuthenticated, ...props}) => (
  <Route {...props} render={props => (isAuthenticated ? <Redirect to={DEFAULT_PAGE} /> : <Component {...props} />)} />
)

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state)
})

export default connect(mapStateToProps)(UnauthenticatedRoute)
