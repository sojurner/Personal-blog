import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

import Typography from "@components/Typography"
import Flex, { flexClasses } from "@components/Flex"
import Icon from "@components/Icon"
import { Logo, StarCurrent } from "@components/Svg"

import { routes, socialLinks } from "../../utils/constants"
import "./Header.scss"

const Header = () => {
  const { pathname } = useLocation()
  return (
    <header
      className={`header--base header--primary ${flexClasses.flexRow} ${flexClasses.alignItemsCenter}`}
    >
      <Logo className="header__logo" />
      <Flex className="header__nav-container">
        {routes.map(routeProps => (
          <Link
            key={`header-link-${routeProps.label}`}
            className="header__nav-link"
            activeClassName="header__nav-link--active"
            to={routeProps.to}
          >
            <Typography
              variant={
                routeProps.to == pathname ? "neutralBlank" : "primaryDark"
              }
              tag="h4"
            >
              {routeProps.label}
            </Typography>
          </Link>
        ))}
      </Flex>
      <Flex className="header__social-container">
        {socialLinks.map(ele => (
          <Flex
            className="header__social-item"
            key={`social-${ele.icon}`}
            onClick={() => window.open(ele.link, "_blank")}
          >
            <Icon svg={ele.icon} color="currentColor" />
          </Flex>
        ))}
      </Flex>
    </header>
  )
}

export { Header as default }
