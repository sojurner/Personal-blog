import React from "react"

import Flex, { PKFlexComponent } from "@components/Flex"
import ContactCard from "./ContactCard"
import SkillsCard from "./SkillsCard"

import cardStyles from "./Card.module.scss"
import { PKVariant, PKDepth } from "@typings/component"

interface PKCardVariant extends PKVariant {
  default: string
  disabled: string
}

const cardVariants: PKCardVariant = Object.freeze({
  primary: cardStyles.cardPrimary,
  secondary: cardStyles.cardSecondary,
  default: cardStyles.cardDefault,
  disabled: cardStyles.cardDisabled,
})

const cardDepths: PKDepth = Object.freeze({
  z0: cardStyles.cardZ0,
  z2: cardStyles.cardZ2,
  z4: cardStyles.cardZ4,
  z5: cardStyles.cardZ5,
})

type CardVariantKey = keyof typeof cardVariants
type CardDepthKey = keyof typeof cardDepths

export interface PKCardComponent extends PKFlexComponent {
  variant?: CardVariantKey
  depth?: CardDepthKey
}

const Card: React.FC<PKCardComponent> = ({
  depth,
  variant,
  className,
  ...props
}) => {
  const classes = `${cardStyles.cardBase} ${cardVariants[variant]} ${
    cardDepths[depth]
  } ${className || ""}`.trim()

  return <Flex className={classes} {...props} />
}

Card.defaultProps = {
  variant: "default",
  depth: "z2",
}

export { SkillsCard, ContactCard, cardDepths, cardVariants, Card as default }
