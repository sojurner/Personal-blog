import React from "react"

import styles from "./ClickAway.module.scss"

interface ClickAwayVariant {
  blur: string
  default: string
}

const clickAwayVariants: ClickAwayVariant = {
  blur: styles.clickAwayBlur,
  default: styles.clickAwayDefault,
}

type ClickAwayVariantKey = keyof typeof clickAwayVariants

interface PKClickAwayListenerComponent
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ClickAwayVariantKey
  className?: string
}

const ClickAwayListener: React.FC<PKClickAwayListenerComponent> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${clickAwayVariants[variant]} ${className && className} ${
    styles.clickAwayBase
  }`

  return <div className={classes} {...props} />
}

export { ClickAwayListener as default }
