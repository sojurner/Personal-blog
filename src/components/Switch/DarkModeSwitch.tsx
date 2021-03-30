import React from "react"

import "./_customSwitch.scss"

const DarkModeSwitch = props => {
  return (
    <label className="switch--darkmode">
      <input type="checkbox" id="toggle" className="plus-minus" {...props} />
      <svg
        className="lines"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        stroke="var(--pk-color-primary-900)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L12 5"></path>
        <path d="M12 19L12 22"></path>
        <path d="M4.93 4.93L7.76 7.76"></path>
        <path d="M16.24 16.24L19.07 19.07"></path>
        <path d="M2 12L6 12"></path>
        <path d="M18 12L22 12"></path>
        <path d="M4.93 19.07L7.76 16.24"></path>
        <path d="M16.24 7.76L19.07 4.93"></path>
      </svg>
    </label>
  )
}

export { DarkModeSwitch as default }
