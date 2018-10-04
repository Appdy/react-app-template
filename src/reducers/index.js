import { combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"

import * as authReducer from "./authReducer"
import * as ideaReducer from "./ideaReducer"

function createReducer(defaultState, reducerMappings) {
  return function(state=defaultState, {type, payload}) {
    const mapping = reducerMappings[type]
    return mapping ? mapping(state, payload) : state
  }
}

const reducer = combineReducers({
  idea: createReducer(ideaReducer.DEFAULT_STATE, ideaReducer.mappings),
  auth: createReducer(authReducer.DEFAULT_STATE, authReducer.mappings),
  form: formReducer
})

export default reducer
