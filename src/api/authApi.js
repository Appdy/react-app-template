import { createAPIcall } from "./utils"

/*
 * data:
 * - refresh_token - token
 */
export const refreshToken = createAPIcall({
  url: "/access-tokens/refresh",
  method: "POST"
})

/*
 * data:
 * - email
 * - password
 */
export const authenticate = createAPIcall({
  url: "/access-tokens",
  method: "POST"
})

/*
 * data:
 * - name
 * - email
 * - password
 */
export const register = createAPIcall({
  url: "/users",
  method: "POST"
})

/*
 * params:
 * - refresh_token - token
 */
export const logout = createAPIcall({
  url: "/access-tokens",
  method: "DELETE"
})

/*
 * return:
 * { email, name, avatar_url }
 */
export const getUserInfo = createAPIcall({
  url: "/me"
})
