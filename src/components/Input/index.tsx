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

interface PKTextAreaComponent
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariantKey
  className?: string
}

const Input: React.FC<PKInputComponent> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${inputVariants[variant]} ${inputStyles.inputBase}`
  return (
    <Flex
      classes={["flexColumn", "justifyContentBetween"]}
      className={className}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <input className={classes} {...props} />
    </Flex>
  )
}

const TextArea: React.FC<PKTextAreaComponent> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${inputVariants[variant]} ${inputStyles.inputBase}`
  return (
    <Flex
      classes={["flexColumn", "justifyContentBetween"]}
      className={className}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <textarea className={classes} {...props} />
    </Flex>
  )
}

Input.defaultProps = {
  variant: "default",
}

TextArea.defaultProps = {
  variant: "default",
}

export { TextArea, Input as default }
