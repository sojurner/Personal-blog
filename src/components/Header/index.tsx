import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import Typography from "@components/Typography"
import Flex, { flexClasses } from "@components/Flex"
import Icon from "@components/Icon"
import { Logo } from "@components/Svg"
import { DarkModeSwitch } from "@components/Switch"

import { routes, socialLinks } from "../../utils/constants"
import "./Header.scss"

const Header = props => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  console.log(root)
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <header
          className={`header--base header--primary ${flexClasses.flexRow} ${flexClasses.alignItemsCenter}`}
        >
          <AniLink
            swipe
            right="entry"
            entryOffset={10}
            to="/"
            className="header__logo"
          >
            <Logo />
          </AniLink>
          <Flex className="header__nav-container">
            {routes.map((routeProps, index) => {
              var currentPathIndex = routes.findIndex(
                route => route.label == root
              )

              return (
                <AniLink
                  key={`header-link-${routeProps.label}`}
                  className="header__nav-link"
                  activeClassName="header__nav-link--active"
                  partiallyActive={true}
                  swipe
                  direction={currentPathIndex < index ? "left" : "right"}
                  to={routeProps.to}
                >
                  <Typography
                    variant={
                      routeProps.label == root ? "neutralBlank" : "primaryDark"
                    }
                    tag="h4"
                  >
                    {routeProps.label}
                  </Typography>
                </AniLink>
              )
            })}
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
            <DarkModeSwitch
              onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
              checked={theme === "dark"}
            />
          </Flex>
        </header>
      )}
    </ThemeToggler>
  )
}

export { Header as default }
