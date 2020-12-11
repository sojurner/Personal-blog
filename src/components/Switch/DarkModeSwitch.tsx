import React from "react"

import "./_customSwitch.scss"

const DarkModeSwitch = props => {
  return (
    <div className="switch--darkmode">
      <input type="checkbox" id="toggle" {...props} />
      <label htmlFor="toggle"></label>
    </div>
  )
}

export { DarkModeSwitch as default }
