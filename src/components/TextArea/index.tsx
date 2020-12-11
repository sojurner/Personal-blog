import React from "react"

import Flex from "@components/Flex"

import { PKExtendedVariant } from "@typings/component"
import textAreaStyles from "./TextArea.module.scss"

const textAreaVariants: PKExtendedVariant = Object.freeze({
  primary: textAreaStyles.textareaPrimary,
  secondary: textAreaStyles.textareaSecondary,
  negative: textAreaStyles.textareaNegative,
  positive: textAreaStyles.textareaPositive,
  neutral: textAreaStyles.textareaNeutral,
  default: textAreaStyles.textareaDefault,
})

type TextAreaVariantKey = keyof typeof textAreaVariants

interface PKTextAreaComponent
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextAreaVariantKey
  className?: string
}

const TextArea: React.FC<PKTextAreaComponent> = ({
  variant,
  className,
  ...props
}) => {
  const classes = `${textAreaVariants[variant]} ${textAreaStyles.textareaBase} ${className}`
  return (
    <Flex
      classes={["flexColumn"]}
      className={classes}
    >
      <label htmlFor={props.id}>{props.name}</label>
      <textarea {...props} />
    </Flex>
  )
}

TextArea.defaultProps = {
  variant: "default",
}

export { TextAreaVariantKey, PKTextAreaComponent, TextArea as default }
