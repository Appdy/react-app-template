import {
  AUTHENTICATE,
  LOGOUT,
  REGISTER,
  REFRESH_TOKEN,
  GET_USER_INFO
} from "../actions/actionTypes"

export const DEFAULT_STATE = {
  jwt: null,
  refresh_token: null,
  name: null,
  email: null,
  error: null,
  avatar_url: null
}

export const mappings = {
  [LOGOUT.SUCCESS]:        () =>  DEFAULT_STATE,
  [REGISTER.SUCCESS]:      (state, {jwt, refresh_token}) => ({...state, jwt, refresh_token}),
  [AUTHENTICATE.SUCCESS]:  (state, {jwt, refresh_token}) => ({...DEFAULT_STATE, jwt, refresh_token}),
  [REFRESH_TOKEN.SUCCESS]: (state, {jwt}) => ({...state, jwt}),
  [GET_USER_INFO.SUCCESS]: (state, payload) => ({...state, ...payload}),
  [REGISTER.FAILURE]:      (state, {error}) => ({...DEFAULT_STATE, error}),
  [AUTHENTICATE.FAILURE]:  (state, {error}) => ({...state, error}),
  [REFRESH_TOKEN.FAILURE]: (state, {error}) => ({...state, error}),
  [GET_USER_INFO.FAILURE]: (state, {error}) => ({...state, error}),
  [LOGOUT.FAILURE]:        (state, {error}) => ({...state, error})
}
