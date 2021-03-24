import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { AniFadeLink } from "@components/Link"

import Typography from "@components/Typography"
import Flex, { flexClasses } from "@components/Flex"
import { Logo } from "@components/Svg"
import { DarkModeSwitch } from "@components/Switch"

import { routes } from "../../utils/constants"
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
                    className="nav-link-txt"
                    variant={
                      routeProps.label === root ? "neutralBlank" : "primaryDark"
                    }
                  >
                    {routeProps.label}
                  </Typography>
                  {routeProps.sub && (
                    <Flex
                      classes={["flexColumn"]}
                      className="nav-link__sub-menu"
                    >
                      {routeProps.sub.map(sublink => (
                        <Link key={`sublink-${sublink.label}`} to={sublink.to}>
                          <Typography variant="primaryDark">{sublink.label}</Typography>
                        </Link>
                      ))}
                    </Flex>
                  )}
                </AniFadeLink>
              )
            })}
          </Flex>
          <DarkModeSwitch
            className="header__dark-mode-switch"
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
        </header>
      )}
    </ThemeToggler>
  )
}

const TemplateHeader = ({ fixed }) => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <header
          className={`header--base ${
            fixed && "header--fixed header--primary"
          } ${flexClasses.flexRow} ${flexClasses.alignItemsCenter}`}
        >
          <AniFadeLink
            to="/"
            className={`header__logo ${!fixed && "header-template__logo"}`}
          >
            <Logo />
          </AniFadeLink>
          <Flex className="header__nav-container">
            {routes.map(routeProps => {
              return (
                <AniFadeLink
                  key={`header-link-${routeProps.label}`}
                  className={`header__nav-link ${
                    !fixed && "header-template__nav-link"
                  }`}
                  activeClassName={`header__nav-link--active ${
                    !fixed && "header-template__nav-link--active"
                  }`}
                  partiallyActive={true}
                  to={routeProps.to}
                >
                  <Typography
                    variant={
                      routeProps.label == root
                        ? "neutralBlank"
                        : "primaryDefault"
                    }
                    tag="p"
                  >
                    {routeProps.label}
                  </Typography>
                </AniFadeLink>
              )
            })}
          </Flex>
          <DarkModeSwitch
            className={`header__dark-mode-switch ${
              !fixed && "header-template__dark-mode-switch"
            }`}
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
        </header>
      )}
    </ThemeToggler>
  )
}

export { TemplateHeader, MainHeader as default }
