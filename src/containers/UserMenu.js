import React from "react"
import { connect } from "react-redux"

import { userNameSelector } from "../selectors"
import { authActions } from "../actions/actions"
import userIcon from "../assets/images/User_ProfilePic.png"

const UserMenu = ({ userName, avatarUrl, logout }) => (
  <div className="user-menu">
    <img className="avatar" alt="User avatar." src={userIcon} />
    <span className="user-name">{userName}</span>
    <button onClick={logout}>Log out</button>
  </div>
)

const mapStateToProps = state => ({
  userName: userNameSelector(state)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)
