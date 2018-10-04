import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm, SubmissionError } from "redux-form"
import { Link } from "react-router-dom"

import { authActions } from "../actions/actions"
import { FormInput } from "../components"
import { isAuthenticatedSelector, authErrorSelector } from "../selectors"

const LoginPage = ({ handleSubmit, error, invalid, isAuthenticated, serverError }) => {
  return (
    <div className="login-page">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <Field type="text" name="email" component={FormInput} label="Email"/>
        <Field type="password" name="password" component={FormInput} label="Password"/>
        <button type="submit">log in</button>
        <span className="not-registered">Don't have an account? <Link to="/register">Create an account</Link></span>
        {invalid && <div className="form-error"><span>{error}</span></div>}
        {serverError && <div className="form-error"><span>{serverError}</span></div>}
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
  serverError: authErrorSelector(state)
})

function onSubmit({ email, password }, dispatch) {
  return new Promise(resolve => {
    if (!email) {
      throw new SubmissionError({
        email: "Email is required",
        _error: "Email is required"
      })

    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      throw new SubmissionError({
        email: "Email is invalid",
        _error: "Email is invalid"
      })
    }

    if (!password) {
      throw new SubmissionError({
        email: "Password is required",
        _error: "Password is required"
      })
    }

    resolve()
  }).then(() => {
    dispatch(authActions.authenticate({ email, password }))
  })
}

export default connect(mapStateToProps)(reduxForm({
  form: "login",
  onSubmit
})(LoginPage))
