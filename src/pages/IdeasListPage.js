import React, { Component } from "react"
import { connect } from "react-redux"

import { IdeaRecord, ideaRecordFormName } from "../components"
import { ideaActions } from "../actions/actions"
import { ideasSelector } from "../selectors"
import { Idea } from "../model"
import { createConfirmDialog } from "../services"
import addAnIdeaButton from "../assets/images/btn_addanidea.png"
import bulbIcon from "../assets/images/bulb.png"

class IdeasListPage extends Component {
  static defaultProps = {
    ideas: []
  }

  constructor(props) {
    super(props)

    this.state = {
      ideas: []
    }

    this.addIdea = this.addIdea.bind(this)
    this.saveIdea = this.saveIdea.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.deleteIdea = this.deleteIdea.bind(this)
  }

  componentDidMount() {
    this.props.getIdeas(1)
  }

  addIdea(event) {
    event.preventDefault()
    const { ideas } = this.state
    this.setState({ideas: [Idea(), ...ideas]})
  }

  saveIdea(idea) {
    const { createIdea, updateIdea } = this.props
    const { ideas } = this.state

    if (Number.isInteger(idea.id) && idea.id < 0) {
      createIdea(idea)
      const ideasNew = ideas.filter(o => o.id !== idea.id)
      this.setState({ideas: ideasNew})

    } else {
      updateIdea(idea)
    }
  }

  cancelEdit(id) {
    if (id < 0) {
      const { ideas } = this.state
      const ideasNew = ideas.filter(o => o.id !== id)
      this.setState({ideas: ideasNew})
    }
  }

  deleteIdea(id) {
    createConfirmDialog({
      content: "This idea will be permanently deleted.",
    }).then(() => this.props.deleteIdea(id))
  }

  render() {
    const { ideas } = this.props
    const { ideas: newIdeas} = this.state
    const allIdeas = [...newIdeas, ...ideas]

    return (
      <div className="ideas-list-page">
        <div className="idea-header">
          <h1>My Ideas</h1>
          <button onClick={this.addIdea}>
            <img src={addAnIdeaButton} alt="Add an Idea Button." />
          </button>
        </div>
        {allIdeas.length === 0 ?
         <div className="ideas-empty">
           <img alt="Bulb." src={bulbIcon} />
           <span>Got Ideas?</span>
         </div> :
         <div className="ideas container">
           <div className="headers row clearfix">
             <span className="offset-6 col-1">Impact</span>
             <span className="col-1">Ease</span>
             <span className="col-1">Confidence</span>
             <span className="col-1">Avg.</span>
           </div>
           <div className="records clearifx">
         {allIdeas.map(idea => <IdeaRecord form={`${ideaRecordFormName}_${idea.id}`} key={idea.id} idea={idea} cancelEdit={this.cancelEdit} deleteIdea={this.deleteIdea} saveIdea={this.saveIdea} initialValues={idea} />)}
           </div>
         </div>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ideas: ideasSelector(state)
})

const mapDispatchToProps = dispatch => ({
  getIdeas: page => dispatch(ideaActions.getIdeas(page)),
  createIdea: idea => dispatch(ideaActions.createIdea(idea)),
  updateIdea: idea => dispatch(ideaActions.updateIdea(idea)),
  deleteIdea: id => dispatch(ideaActions.deleteIdea(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(IdeasListPage)
