import {
  GET_IDEAS,
  CREATE_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA
} from "./actionTypes"

export const getIdeas = page => ({
  type: GET_IDEAS.REQUEST,
  payload: {
    params: {
      page
    }
  }
})

export const createIdea = ({content, impact, ease, confidence}) => ({
  type: CREATE_IDEA.REQUEST,
  payload: {
    data: {
      content,
      impact,
      ease,
      confidence
    }
  }
})

export const updateIdea = ({id, content, impact, ease, confidence}) => ({
  type: UPDATE_IDEA.REQUEST,
  payload: {
    data: {
      content,
      impact,
      ease,
      confidence
    },
    pathParams: [
      id
    ]
  }
})

export const deleteIdea = id => ({
  type: DELETE_IDEA.REQUEST,
  payload: {
    pathParams: [
      id
    ]
  }
})
