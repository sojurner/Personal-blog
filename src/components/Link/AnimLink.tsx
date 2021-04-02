import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import LogoLoader from './LogoLoader.svg'
import { PKLink } from "."

const AniLoaderLink: React.FC<PKLink> = props => {
  return (
    <AniLink
      direction="bottom"
      duration={2}
      cover
      bg={`
        var(--pk-color-blank-700)
        url(${LogoLoader})
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
