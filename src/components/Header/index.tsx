import React from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import Typography from "@components/Typography"
import Flex from "@components/Flex"
import Logo from "@assets/Logo.svg"
import { DarkModeSwitch } from "@components/Switch"

import { routes } from "@utils/constants"
import "./Header.scss"

const MainHeader = () => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  return (
    <header className="header--base header--sticky header--primary">
      <Link aria-label="logo home page" to="/" className="header__logo">
        <Logo className="pk-logo" />
      </Link>
      <Flex className="header__nav-container">
        {routes.map(({ label, ...routeProps }) => {
          return (
            <Link
              key={`header-link-${label}`}
              className="header__nav-link"
              activeClassName="header__nav-link--active"
              partiallyActive={true}
              {...routeProps}
            >
              <Typography
                className="nav-link-txt"
                tag="h5"
                variant={label === root ? "neutralBlank" : "primaryDark"}
              >
                {label}
              </Typography>
            </Link>
          )
        })}
      </Flex>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <DarkModeSwitch
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
        )}
      </ThemeToggler>
    </header>
  )
}

const TemplateHeader = ({ fixed }) => {
  const { pathname } = useLocation()
  const [_, root] = pathname.split("/")
  return (
    <header
      className={`header--base ${fixed && "header--fixed header--primary"}`}
    >
      <Link
        to="/"
        className={`header__logo ${!fixed && "header-template__logo"}`}
      >
        <Logo />
      </Link>
      <Flex className="header__nav-container">
        {routes.map(routeProps => {
          return (
            <Link
              key={`header-link-${routeProps.label}`}
              className={`header__nav-link ${!fixed && "header-template__nav-link"
                }`}
              activeClassName={`header__nav-link--active ${!fixed && "header-template__nav-link--active"
                }`}
              partiallyActive={true}
              to={routeProps.to}
            >
              <Typography
                className="nav-link-txt"
                tag="h5"
                variant={
                  routeProps.label == root ? "neutralBlank" : "primaryDark"
                }
              >
                {routeProps.label}
              </Typography>
            </Link>
          )
        })}
      </Flex>
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <DarkModeSwitch
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
        )}
      </ThemeToggler>
    </header>
  )
}

export { TemplateHeader, MainHeader as default }
