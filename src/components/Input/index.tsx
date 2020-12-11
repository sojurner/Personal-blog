import React from "react"

import Flex from "@components/Flex"

import { PKExtendedVariant } from "@typings/component"
import inputStyles from "./Input.module.scss"

const inputVariants: PKExtendedVariant = Object.freeze({
  primary: inputStyles.inputPrimary,
  secondary: inputStyles.inputSecondary,
  negative: inputStyles.inputNegative,
  positive: inputStyles.inputPositive,
  neutral: inputStyles.inputNeutral,
  default: inputStyles.inputDefault,
})

type InputVariantKey = keyof typeof inputVariants

interface PKInputComponent extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariantKey
  className?: string
}

const Input: React.FC<PKInputComponent> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${inputVariants[variant]} ${inputStyles.inputBase} ${className}`
  return (
    <Flex
      classes={["flexColumn"]}
      className={classes}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <input {...props} />
    </Flex>
  )
}

Input.defaultProps = {
  variant: "default",
}

export { InputVariantKey, PKInputComponent, Input as default }
