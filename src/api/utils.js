import axios from "axios"

import { API_HOST } from "../config"
import { accessTokenSelector } from "../selectors"
import { getStore } from "../store"

const axiosInstance = axios.create({
  baseURL: API_HOST
});

function getAccessToken() {
  const state = getStore().getState()
  return accessTokenSelector(state)
}

function request(config) {
  config.headers = {
    ...config.headers,
    "x-access-token": getAccessToken(),
  }

  return axiosInstance(config)
}

export function createAPIcall(definition) {
  const config = { headers: {}, ...definition }

  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json"
  }

  return function(params={}, data, pathParams=[]) {
    let localConfig = {
      ...config,
      params,
      data: data ? JSON.stringify(data) : null
    }

    pathParams.forEach(param => {
      localConfig.url = localConfig.url.replace(/:\w+\/?/, `${param}/`)
    })
    return request(localConfig)
  }
}
