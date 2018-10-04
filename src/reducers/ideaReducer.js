import {
  GET_IDEAS,
  CREATE_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA,
} from "../actions/actionTypes"

export const DEFAULT_STATE = {
  ideas: [],
  error: null
}

export const mappings = {
  [GET_IDEAS.SUCCESS]:   (state, payload) => ({...state, ideas: payload}),
  [GET_IDEAS.FAILURE]:   (state, {error}) => ({...state, error}),
  [CREATE_IDEA.FAILURE]: (state, error) => ({...state, error}),
  [DELETE_IDEA.FAILURE]: (state, error) => ({...state, error}),
  [UPDATE_IDEA.FAILURE]: (state, error) => ({...state, error})
}
