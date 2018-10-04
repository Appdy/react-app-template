import React from "react"

const IdeaOptions = ({doAction, cancelAction, doIcon, cancelIcon, doAlt, cancelAlt, className=""}) => (
  <div className={`idea-options ${className}`}>
    <button onClick={doAction}>
      <img alt={doAlt} src={doIcon} />
    </button>
    <button onClick={cancelAction}>
      <img alt={cancelAlt} src={cancelIcon} />
    </button>
  </div>
)

export default IdeaOptions
