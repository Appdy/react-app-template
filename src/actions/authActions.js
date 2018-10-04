import {
  AUTHENTICATE,
  LOGOUT,
  REGISTER,
  REFRESH_TOKEN,
  GET_USER_INFO
} from "./actionTypes"

export const register = ({ name, email, password }) => ({
  type: REGISTER.REQUEST,
  payload: {
    data: {
      name,
      email,
      password
    }
  }
})

export const authenticate = ({ email, password }) => ({
  type: AUTHENTICATE.REQUEST,
  payload: {
    data: {
      email,
      password
    }
  }
})

export const logout = () => ({
  type: LOGOUT.REQUEST
})

export const refreshToken = () => ({
  type: REFRESH_TOKEN.REQUEST
})

export const getUserInfo = () => ({
  type: GET_USER_INFO.REQUEST
})
