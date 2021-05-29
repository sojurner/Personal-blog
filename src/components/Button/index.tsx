import React from "react"

import btnStyles from "./Button.module.scss"
import { PKExtendedVariant } from "@typings/component"

const btnVariants: PKExtendedVariant = Object.freeze({
  primary: btnStyles.btnPrimary,
  primaryActive: btnStyles.btnPrimaryActive,
  secondary: btnStyles.btnSecondary,
  secondaryActive: btnStyles.btnSecondaryActive,
  negative: btnStyles.btnNegative,
  negativeActive: btnStyles.btnNegativeActive,
  positive: btnStyles.btnPositive,
  positiveActive: btnStyles.btnPositiveActive,
  neutral: btnStyles.btnNeutral,
  default: btnStyles.btnDefault,
  defaultActive: btnStyles.btnDefaultActive,
})

type BtnVariantKey = keyof typeof btnVariants

interface PKBtnComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariantKey
  className?: string
}

const Button: React.FC<PKBtnComponent> = ({ className, variant, ...props }) => {
  const classes = `${btnVariants[variant]} ${className || ""} ${btnStyles.btnBase}`
  return <button className={classes} {...props} />
}

Button.defaultProps = {
  variant: "default",
}

export { BtnVariantKey, PKBtnComponent, Button as default }
