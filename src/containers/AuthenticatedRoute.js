import React from "react"
import { Redirect, Route } from "react-router"
import { connect } from "react-redux"

import { isAuthenticatedSelector } from "../selectors"

const AuthenticatedRoute = ({component: Component, isAuthenticated, ...props}) => (
  <Route {...props} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
)

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state)
})

export default connect(mapStateToProps)(AuthenticatedRoute)
