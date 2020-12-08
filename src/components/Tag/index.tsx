import React from "react"

import Typography from "@components/Typography"

import tagStyles from "./Tag.module.scss"
import { PKExtendedVariant } from "@typings/component"

const tagVariants: PKExtendedVariant = Object.freeze({
  primary: tagStyles.tagPrimary,
  secondary: tagStyles.tagSecondary,
  negative: tagStyles.tagNegative,
  positive: tagStyles.tagPositive,
  neutral: tagStyles.tagNeutral,
  default: tagStyles.tagDefault,
})

type TagVariantKey = keyof typeof tagVariants

export interface PKTagComponent extends React.HTMLAttributes<HTMLElement> {
  variant?: TagVariantKey
  label: string
  className?: string
}

const Tag: React.FC<PKTagComponent> = ({
  label,
  variant,
  children,
  className,
  ...props
}) => {
  const classes: string = `${tagStyles.tagBase} ${tagVariants[variant]} ${
    className || ""
  }`.trim()

  return (
    <Typography
      className={classes}
      tag={"span"}
      variant={variant != "default" ? "neutralBlank" : "neutralDark"}
      {...props}
    >
      {label}
    </Typography>
  )
}

Tag.defaultProps = {
  variant: "default",
}

export { tagVariants, Tag as default }
