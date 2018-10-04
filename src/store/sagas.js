import { call, put, select, takeLatest } from "redux-saga/effects"

import { refreshTokenSelector } from "../selectors"
import {
  AUTHENTICATE,
  GET_USER_INFO,
  REGISTER,
  LOGOUT,
  GET_IDEAS,
  CREATE_IDEA,
  UPDATE_IDEA,
  DELETE_IDEA,
  REFRESH_TOKEN
} from "../actions/actionTypes"
import * as API from "../api"
import { authActions, ideaActions } from "../actions/actions"

function* callAPI({api, actionType, params={}, data={}, pathParams=[]}) {
  try {
    const response = yield call(api, params, data, pathParams)
    yield put({type: actionType.SUCCESS, payload: response.data})
    return response

  } catch(error) {
    yield put({type: actionType.FAILURE, payload: {error: error.response.data.reason}})

    if (error.response.status === 401) {
      yield put({type: REFRESH_TOKEN.REQUEST})
      const refreshTokenResponse = yield call(refreshToken)

      if (refreshTokenResponse) {
        yield put({type: actionType.REQUEST, payload: {params, data, pathParams}})
      }
    }
  }
}

function* refreshToken() {
  const token = yield select(refreshTokenSelector)
  const response = yield call(callAPI, {
    api: API.refreshToken,
    actionType: REFRESH_TOKEN,
    data: {"refresh_token": token}
  })
  return response
}

function* authenticate({payload}) {
  const response = yield call(callAPI, {
    api: API.authenticate,
    actionType: AUTHENTICATE,
    ...payload
  })

  if (response) {
    yield put(authActions.getUserInfo())
  }
}

function* register({payload}) {
  const response = yield call(callAPI, {
    api: API.register,
    actionType: REGISTER,
    ...payload
  })

  if (response) {
    yield put(authActions.getUserInfo())
  }
}

function* logout() {
  const token = yield select(refreshTokenSelector)

  yield call(callAPI, {
    api: API.logout,
    actionType: LOGOUT,
    params: {"refresh_token": token}
  })
}

function* getUserInfo() {
  yield call(callAPI, {
    api: API.getUserInfo,
    actionType: GET_USER_INFO
  })
}

function* getIdeas({payload}) {
  yield call(callAPI, {
    api: API.getIdeas,
    actionType: GET_IDEAS,
    ...payload
  })
}

function* createIdea({payload}) {
  const response = yield call(callAPI, {
    api: API.createIdea,
    actionType: CREATE_IDEA,
    ...payload
  })

  if (response) {
    yield put(ideaActions.getIdeas(1))
  }
}

function* updateIdea({payload}) {
  yield call(callAPI, {
    api: API.updateIdea,
    actionType: UPDATE_IDEA,
    ...payload
  })
}

function* deleteIdea({payload}) {
  const response = yield call(callAPI, {
    api: API.deleteIdea,
    actionType: DELETE_IDEA,
    ...payload
  })

  if (response) {
    yield put(ideaActions.getIdeas(1))
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTHENTICATE.REQUEST, authenticate)
  yield takeLatest(REGISTER.REQUEST, register)
  yield takeLatest(LOGOUT.REQUEST, logout)
  yield takeLatest(GET_IDEAS.REQUEST, getIdeas)
  yield takeLatest(CREATE_IDEA.REQUEST, createIdea)
  yield takeLatest(UPDATE_IDEA.REQUEST, updateIdea)
  yield takeLatest(DELETE_IDEA.REQUEST, deleteIdea)
  yield takeLatest(GET_USER_INFO.REQUEST, getUserInfo)
}
