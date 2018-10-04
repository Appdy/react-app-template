import React, { Component } from "react"
import { connect } from "react-redux"
import { Field, formValueSelector, reduxForm, change } from "redux-form"
import classNames from "classnames"

import { FormInput } from "../components"
import { IdeaOptions } from "../components"

import binIcon from "../assets/images/bin.png"
import penIcon from "../assets/images/pen.png"
import cancelIcon from "../assets/images/Cancel_X.png"
import confirmIcon from "../assets/images/Confirm_V.png"

export const INITIAL_VALUES = {impact: 10, ease: 10, confidence: 10}
export const FORM_NAME = "ideaRecord"

class IdeaRecord extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditState: this.props.idea.id < 0,
      isFocused: false
    }

    this.saveIdea = this.saveIdea.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.editIdea = this.editIdea.bind(this)
    this.deleteIdea = this.deleteIdea.bind(this)
    this.calculateAverage = this.calculateAverage.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }

  saveIdea(event) {
    event.preventDefault()
    const { idea, content, impact, ease, confidence, saveIdea } = this.props

    this.setState({isEditState: false})

    saveIdea({id: idea.id, content, impact, ease, confidence})
  }

  cancelEdit(event) {
    event.preventDefault()
    const { cancelEdit, idea, change } = this.props

    Object.keys(idea).forEach(key => change(key, idea[key]))

    this.setState({isEditState: false})

    cancelEdit(idea.id)
  }

  editIdea(event) {
    event.preventDefault()
    this.setState({isEditState: true})
  }

  deleteIdea(event) {
    event.preventDefault()
    const { deleteIdea, idea } = this.props
    deleteIdea(idea.id)
  }

  calculateAverage() {
    const { impact, ease, confidence } = this.props

    if (impact && ease && confidence) {
      return ((parseInt(impact, 10) + parseInt(ease, 10) + parseInt(confidence, 10)) / 3).toFixed(0)
    }

    return null
  }

  onMouseEnter() {
    this.setState({ isFocused: true })
  }

  onMouseLeave() {
    this.setState({ isFocused: false })
  }

  renderSelectOptions(keyPrefix) {
    const range = [...Array(10).keys()].reverse()
    return range.map((value, idx) => <option key={`${keyPrefix}_${idx}`} value={value+1}>{value+1}</option>)
  }

  render() {
    const { content, impact, ease, confidence } = this.props
    const { isEditState, isFocused } = this.state

    return (
      <form className={classNames("idea-record", "fa fa-circle", {focused: isFocused}, {edit: isEditState})} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <div className="container row">
        {isEditState ?
         <Field component={FormInput} type="text" name="content" className="value col-6" /> :
         <span className="col-6">{content}</span>}
        {isEditState ?
         <Field component="select" name="impact" className="col-1">
           {this.renderSelectOptions("impact")}
         </Field> :
         <span className="value col-1">{impact}</span>}
        {isEditState ?
         <Field component="select" name="ease" className="col-1">
           {this.renderSelectOptions("ease")}
         </Field> :
         <span className="value col-1">{ease}</span>}
        {isEditState ?
         <Field component="select" name="confidence" className="col-1">
           {this.renderSelectOptions("confidence")}
         </Field> :
         <span className="value col-1">{confidence}</span>}
        <span className="value average col-1">{this.calculateAverage()}</span>
        {isEditState ?
         <IdeaOptions
           className="col-2"
           doAction={this.saveIdea}
           cancelAction={this.cancelEdit}
           doIcon={confirmIcon}
           cancelIcon={cancelIcon}
           doAlt="Check icon."
           cancelAlt="Cross icon." />
         :
         <IdeaOptions
           className="col-2"
           doAction={this.editIdea}
           cancelAction={this.deleteIdea}
           doIcon={penIcon}
           cancelIcon={binIcon}
           doAlt="Edit icon."
           cancelAlt="Bin icon." />
        }
      </div>
      </form>
    )
  }
}

const mapStateToProps = (state, {idea}) => {
  const selector = formValueSelector(`${FORM_NAME}_${idea.id}`)

  return {
    content: selector(state, "content"),
    impact: selector(state, "impact"),
    ease: selector(state, "ease"),
    confidence: selector(state, "confidence")
  }
}

const mapDispatchToProps = (dispatch, {idea: id}) => {
  const formName = `${FORM_NAME}_${id}`

  return {
    change: (field, value) => dispatch(change(formName, field, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({})(IdeaRecord))
