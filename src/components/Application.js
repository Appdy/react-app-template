import React, { Children, cloneElement } from "react"
import { Helmet } from "react-helmet"

import { WEBSITE_NAME } from "../config"

const renderChildren = (children, props) => Children.map(children, child => cloneElement(child, props))

const Application = ({children, ...rest}) => (
  <div className="application">
    <Helmet>
      <meta charSet="utf-8" />
      <title>{WEBSITE_NAME}</title>
    </Helmet>
    {renderChildren(children, rest)}
  </div>
)
export default Application
