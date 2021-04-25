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

const tagShapes = Object.freeze({
  singleRight: tagStyles.tagSingleRight,
  singleLeft: tagStyles.tagSingleLeft,
  doubleRight: tagStyles.tagDoubleRight,
  doubleLeft: tagStyles.tagDoubleLeft,
})

type TagVariantKey = keyof typeof tagVariants
type TagShapeKey = keyof typeof tagShapes

export interface PKTagComponent extends React.HTMLAttributes<HTMLElement> {
  variant?: TagVariantKey
  shape?: TagShapeKey
  label: string
  className?: string
}

const Tag: React.FC<PKTagComponent> = ({
  label,
  variant,
  children,
  shape,
  className,
  ...props
}) => {
  const classes: string = `${tagStyles.tagBase} ${tagVariants[variant]} ${
    tagShapes[shape]
  } ${className || ""}`.trim()

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
  shape: "singleRight",
}

export { tagVariants, Tag as default }
