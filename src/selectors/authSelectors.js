import { createSelector } from "reselect"

const authSelector = state => state.auth

export const userNameSelector = createSelector(authSelector, ({name}) => name)
export const accessTokenSelector = createSelector(authSelector, ({jwt}) => jwt)
export const refreshTokenSelector = createSelector(authSelector, ({refresh_token}) => refresh_token)
export const isAuthenticatedSelector = createSelector(accessTokenSelector, jwt => jwt !== null)
export const authErrorSelector = createSelector(authSelector, ({error}) => error)
