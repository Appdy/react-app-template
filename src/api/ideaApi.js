import { createAPIcall } from "./utils"

/*
 * params:
 * - page - A single page of ideas (integer > 0)
 */
export const getIdeas = createAPIcall({
  url: "/ideas",
  method: "GET"
})

/*
 * data:
 * content -
 * impact -
 * ease -
 * confidence -
 */
export const createIdea = createAPIcall({
  url: "/ideas",
  method: "POST"
})

/*
 * path params:
 * /idea_ID
 */
export const deleteIdea = createAPIcall({
  url: "/ideas/:id",
  method: "DELETE"
})

/*
 * path params:
 * /idea_ID
 * data:
 * - content -
 * - impact -
 * - ease -
 * - confidence -
 */
export const updateIdea = createAPIcall({
  url: "/ideas/:id",
  method: "PUT"
})
