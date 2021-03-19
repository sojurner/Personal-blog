import React from "react"

import { PKComponent, PKVariant } from "@typings/component"
import dividerStyles from "./Divider.module.scss"

const dividerVariants: PKVariant = Object.freeze({
  primary: dividerStyles["dividerPrimary"],
  secondary: dividerStyles["dividerSecondary"],
  default: dividerStyles["dividerDefault"],
})

type DividerVariantKey = keyof typeof dividerVariants

const Divider: React.FC<PKComponent<DividerVariantKey>> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${dividerVariants[variant]} ${dividerStyles["dividerBase"]} ${className ? className : ""}`.trim()
  return <hr {...props} className={classes} />
}

Divider.defaultProps = {
  variant: "default",
}

export { dividerVariants, Divider as default }
