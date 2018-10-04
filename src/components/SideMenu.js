import React from "react"
import { connect } from "react-redux"

import { UserMenu } from "../containers"
import { isAuthenticatedSelector } from "../selectors"
import icon from "../assets/images/IdeaPool_icon.png"

const SideMenu = ({ isAuthenticated }) => {
  return (
    <div className="side-menu">
      <div className="main-icon">
        <img src={icon} alt="Idea Pool icon."/>
        <span>The Idea Pool</span>
      </div>

      {isAuthenticated && <UserMenu />}
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state)
})

export default connect(mapStateToProps)(SideMenu)
