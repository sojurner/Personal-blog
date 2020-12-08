import React from "react"

import { PKComponent, PKVariant } from "@typings/component"
import dividerStyles from "./Divider.module.scss"

const dividerVariants: PKVariant = Object.freeze({
  primary: dividerStyles["dividerPrimary"],
  secondary: dividerStyles["dividerSecondary"],
})

type DividerVariantKey = keyof typeof dividerVariants

const Divider: React.FC<PKComponent<DividerVariantKey>> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${dividerVariants[variant]} ${className && className}`.trim()
  return <hr {...props} className={classes} />
}

Divider.defaultProps = {
  variant: "primary",
}

export { dividerVariants, Divider as default }
