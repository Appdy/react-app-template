import React from "react"

import SideMenu from "./SideMenu"

const MainTemplate = ({children: Children, ...rest}) => (
  <div className="main-template">
    <div className="main-sidebar">
      <SideMenu />
    </div>
    <div className="main-content">
      <Children {...rest} />
    </div>
  </div>
)

export default MainTemplate
