import { GatsbyLinkProps } from "gatsby"
import { AniLoaderLink, AniFadeLink } from "./AnimLink"

interface PKLink extends GatsbyLinkProps<React.HTMLAttributes<HTMLElement>> {
  className: string
}

export { PKLink, AniFadeLink, AniLoaderLink }
