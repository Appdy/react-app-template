import React from "react"
import ReactDOM from "react-dom"

const ConfirmDialog = ({content, confirmHandler, cancelHandler, confirmLabel, cancelLabel}) => (
  <div className="dialog confirm-dialog">
    <h1>Are you sure?</h1>
    <p>{content}</p>
    <div className="controls">
      <button onClick={cancelHandler}>{cancelLabel}</button>
      <button className="confirm" onClick={confirmHandler}>{confirmLabel}</button>
    </div>
  </div>
)

let container = document.querySelector("body > .dialog-container")

export default function createConfirmDialog({content, confirmLabel="ok", cancelLabel="cancel"}) {
  if (!container || container.length === 0) {
    container = document.createElement("div")
    container.classList.add("dialog-container")
    document.body.appendChild(container)
  }

  let wrapper = document.createElement("div")
  wrapper.classList.add("dialog-wrapper")
  container.appendChild(wrapper)

  const closeDialog = () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(wrapper)
      setTimeout(() => {
        container.removeChild(wrapper)
      })
    })
  }

  return new Promise((confirmHandler, cancelHandler) => {
    ReactDOM.render(
      <ConfirmDialog
        content={content}
        confirmHandler={confirmHandler}
        cancelHandler={cancelHandler}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
      />, wrapper)
  }).then(result => {
    closeDialog()
    return result
  }, result => {
    closeDialog()
    return Promise.reject(result)
  })
}
