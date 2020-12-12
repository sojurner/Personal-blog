import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import { PKLink } from "."

import pk_logo from "../../images/pk-logo-loader.svg"

const AniLoaderLink: React.FC<PKLink> = props => {
  return (
    <AniLink
      direction="bottom"
      duration={2}
      cover
      bg={`
        var(--pk-color-blank-700)
        url(${pk_logo})
        center
        no-repeat
        fixed
        padding-box
        content-box
        `}
      {...props}
    ></AniLink>
  )
}

const AniFadeLink: React.FC<PKLink> = props => {
  return <AniLink fade duration={0.3} {...props} />
}

export { AniLoaderLink, AniFadeLink }
