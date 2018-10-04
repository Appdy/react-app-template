import { createSelector } from "reselect"

const ideaSelector = state => state.idea

export const ideasSelector = createSelector(ideaSelector, ({ideas}) => ideas || [])
