function createAPIActionType(actionName) {
  return {
    REQUEST: `${actionName}_REQUEST`,
    SUCCESS: `${actionName}_SUCCESS`,
    FAILURE: `${actionName}_FAILURE`
  }
}

export const AUTHENTICATE = createAPIActionType("AUTHENTICATE")
export const REGISTER = createAPIActionType("REGISTER")
export const LOGOUT = createAPIActionType("LOGOUT")
export const REFRESH_TOKEN = createAPIActionType("REFRESH_TOKEN")
export const GET_USER_INFO = createAPIActionType("GET_USER_INFO")

export const GET_IDEAS = createAPIActionType("GET_IDEAS")
export const CREATE_IDEA = createAPIActionType("CREATE_IDEA")
export const DELETE_IDEA = createAPIActionType("DELETE_IDEA")
export const UPDATE_IDEA = createAPIActionType("UPDATE_IDEA")
