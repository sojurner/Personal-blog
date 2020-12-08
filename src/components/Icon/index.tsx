import React from "react"
import { Icon as IIcon, IconifyIcon } from "@iconify/react"

import blog from "@iconify-icons/mdi-light/message-text"
import military from "@iconify-icons/mdi/knife-military"
import account from "@iconify-icons/mdi-light/account"
import refresh from "@iconify-icons/mdi-light/refresh"

import social from "@iconify-icons/mdi/account-group-outline"
import book from "@iconify-icons/mdi/book-open-page-variant-outline"
import console from "@iconify-icons/mdi-light/console"
import calendar from "@iconify-icons/mdi/calendar-clock"
import mapMarker from "@iconify-icons/mdi/map-marker";

import csharp from "@iconify-icons/mdi/language-csharp"
import javascript from "@iconify-icons/mdi/language-javascript"
import typescript from "@iconify-icons/mdi/language-typescript"
import css from "@iconify-icons/mdi/language-css3"
import html from "@iconify-icons/mdi/language-html5"

import react from "@iconify-icons/mdi/react"
import nodejs from "@iconify-icons/mdi/nodejs"
import sass from "@iconify-icons/mdi/sass"
import dotnet from "@iconify-icons/mdi/dot-net"

import vs from "@iconify-icons/mdi/microsoft-visual-studio-code"
import vscode from "@iconify-icons/mdi/microsoft-visual-studio"
import gitlab from "@iconify-icons/mdi/gitlab"
import github from "@iconify-icons/mdi/github"
import docker from "@iconify-icons/mdi/docker"

import web from "@iconify-icons/mdi/web"
import codetags from "@iconify-icons/mdi/code-tags"
import tools from "@iconify-icons/mdi/tools"

import cellphone from "@iconify-icons/mdi/cellphone"
import email from "@iconify-icons/mdi/email-outline"
import linkedIn from "@iconify-icons/mdi/linkedin-box"

import iconStyles from "./Icon.module.scss"
import { PKColorVariant } from "@typings/component"

const iconVariants: PKColorVariant = Object.freeze({
  neutralDefault: iconStyles.iconNeutralDefault,
  neutralLight: iconStyles.iconNeutralLight,
  neutralDark: iconStyles.iconNeutralDark,
  neutralBlank: iconStyles.iconNeutralBlank,
  negativeDefault: iconStyles.iconNegativeDefault,
  negativeLight: iconStyles.iconNegativeLight,
  negativeDark: iconStyles.iconNegativeDark,
  positiveDefault: iconStyles.iconPositiveDefault,
  positiveLight: iconStyles.iconPositiveLight,
  positiveDark: iconStyles.iconPositiveDark,
  primaryDefault: iconStyles.iconPrimaryDefault,
  primaryLight: iconStyles.iconPrimaryLight,
  primaryDark: iconStyles.iconPrimaryDark,
  secondaryDefault: iconStyles.iconSecondaryDefault,
  secondaryLight: iconStyles.iconSecondaryLight,
  secondaryDark: iconStyles.iconSecondaryDark,
  currentColor: "currentColor"
})

const iconSvg = Object.freeze({
  blog,
  military,
  book,
  console,
  email,
  account,
  refresh,
  social,
  calendar,
  react,
  csharp,
  javascript,
  nodejs,
  typescript,
  css,
  html,
  dotnet,
  sass,
  vscode,
  vs,
  web,
  codetags,
  tools,
  gitlab,
  github,
  docker,
  cellphone,
  linkedIn,
  mapMarker
})

type IconVariantKey = keyof typeof iconVariants
type IconSvgKey = keyof typeof iconSvg | string;

interface PKIconComponent extends Omit<IconifyIcon, "icon"> { 
  variant?: IconVariantKey
  svg?: IconSvgKey
  className?: string
}

const Icon: React.FC<PKIconComponent> = ({
  variant,
  svg,
  className,
  ...props
}) => {
  const classes = `${iconStyles.iconBase} ${iconVariants[variant]} ${
    className && className
  }`.trim()
  return <IIcon {...props} icon={iconSvg[svg]} className={classes} />
}

Icon.defaultProps = {
  variant: "currentColor",
  svg: "blog",
}

export {
  iconVariants,
  IconVariantKey,
  IconSvgKey,
  PKIconComponent,
  Icon as default,
}
