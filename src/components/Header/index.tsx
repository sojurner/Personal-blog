import React from "react"
import { useLocation } from "@reach/router"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { AniFadeLink } from "@components/Link"

import Typography from "@components/Typography"
import Flex, { flexClasses } from "@components/Flex"
import Icon from "@components/Icon"
import { Logo } from "@components/Svg"
import { DarkModeSwitch } from "@components/Switch"

import { routes, socialLinks } from "../../utils/constants"
import "./Header.scss"

const MainHeader = () => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <header
          className={`header--base header--sticky header--primary ${flexClasses.flexRow} ${flexClasses.alignItemsCenter}`}
        >
          <AniFadeLink to="/" className="header__logo">
            <Logo />
          </AniFadeLink>
          <Flex className="header__nav-container">
            {routes.map(routeProps => {
              return (
                <AniFadeLink
                  key={`header-link-${routeProps.label}`}
                  className="header__nav-link"
                  activeClassName="header__nav-link--active"
                  partiallyActive={true}
                  to={routeProps.to}
                >
                  <Typography
                    variant={
                      routeProps.label == root ? "neutralBlank" : "primaryDark"
                    }
                    tag="p"
                  >
                    {routeProps.label}
                  </Typography>
                </AniFadeLink>
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

const TemplateHeader = () => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <header
          className={`header--base ${flexClasses.flexRow} ${flexClasses.alignItemsCenter}`}
        >
          <AniFadeLink to="/" className="header__logo">
            <Logo />
          </AniFadeLink>
          <Flex className="header__nav-container">
            {routes.map(routeProps => {
              return (
                <AniFadeLink
                  key={`header-link-${routeProps.label}`}
                  className="header__nav-link"
                  activeClassName="header__nav-link--active"
                  partiallyActive={true}
                  to={routeProps.to}
                >
                  <Typography
                    variant={
                      routeProps.label == root ? "neutralBlank" : "primaryDark"
                    }
                    tag="p"
                  >
                    {routeProps.label}
                  </Typography>
                </AniFadeLink>
              )
            })}
          </Flex>
          <Flex className="header__social-container">
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

export { TemplateHeader, MainHeader as default }
