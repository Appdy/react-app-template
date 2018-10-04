let NEW_ID_BASE = 0

const Idea = ({id, content, impact=10, ease=10, confidence=10}={}) => ({
  id: id || --NEW_ID_BASE,
  content,
  impact,
  ease,
  confidence
})

export default Idea
