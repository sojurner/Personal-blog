import React from "react"

import { PKElementComponent, PKColorVariant } from "@typings/component"
import typographyStyles from "./Typography.module.scss"

const typographyVariants: PKColorVariant = Object.freeze({
  neutralDefault: typographyStyles["typographyNeutralDefault"],
  neutralLight: typographyStyles["typographyNeutralLight"],
  neutralDark: typographyStyles["typographyNeutralDark"],
  neutralBlank: typographyStyles["typographyNeutralBlank"],
  negativeDefault: typographyStyles["typographyNegativeDefault"],
  negativeLight: typographyStyles["typographyNegativeLight"],
  negativeDark: typographyStyles["typographyNegativeDark"],
  positiveDefault: typographyStyles["typographyPositiveDefault"],
  positiveLight: typographyStyles["typographyPositiveLight"],
  positiveDark: typographyStyles["typographyPositiveDark"],
  primaryDefault: typographyStyles["typographyPrimaryDefault"],
  primaryLight: typographyStyles["typographyPrimaryLight"],
  primaryDark: typographyStyles["typographyPrimaryDark"],
  secondaryDefault: typographyStyles["typographySecondaryDefault"],
  secondaryLight: typographyStyles["typographySecondaryLight"],
  secondaryDark: typographyStyles["typographySecondaryDark"],
  currentColor: "",
})

const typographyTags = Object.freeze({
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  label: "label",
  span: "span",
})

type TypographyVariantKey = keyof typeof typographyVariants
type TypographyTagKey = keyof typeof typographyTags

const Typography: React.FC<PKElementComponent<
  TypographyTagKey,
  TypographyVariantKey
>> = ({ tag, variant, children, className, ...props }) => {
  const classes = `${typographyVariants[variant]} ${className || ""}`.trim()

  return React.createElement(tag, { className: classes, ...props }, children)
}

Typography.defaultProps = {
  tag: "p",
  variant: "neutralDefault",
}

export { Typography as default }
