import React from "react"
import Img, { GatsbyImageFluidProps } from "gatsby-image"

import avatarStyles from "./Avatar.module.scss"
import { PKVariant } from "@typings/component"

interface PKAvatarVariant extends PKVariant {
  negative: string
  positive: string
  default: string
}

interface PKAvatarShape {
  hexagon: string
  circle: string
}

const avatarVariants: PKAvatarVariant = Object.freeze({
  primary: avatarStyles.avatarPrimary,
  secondary: avatarStyles.avatarSecondary,
  negative: avatarStyles.avatarNegative,
  positive: avatarStyles.avatarPositive,
  neutral: avatarStyles.avatarNeutral,
  default: avatarStyles.avatarDefault,
})

const avatarShapes: PKAvatarShape = Object.freeze({
  circle: avatarStyles.avatarCircle,
  hexagon: avatarStyles.avatarHexagon,
})

type AvatarVariantKey = keyof typeof avatarVariants
type AvatarShapeKey = keyof typeof avatarShapes

export interface PKAvatarComponent extends GatsbyImageFluidProps {
  variant?: AvatarVariantKey
  shape?: AvatarShapeKey
}

const Avatar: React.FC<PKAvatarComponent> = ({
  variant,
  shape,
  children,
  className,
  ...props
}) => {
  const classes: string = `${avatarStyles.avatarBase} ${avatarShapes[shape]} ${
    avatarVariants[variant]
  } ${className || ""}`.trim()

  return <Img className={classes} {...props} />
}

Avatar.defaultProps = {
  variant: "default",
  shape: "circle",
}

export { avatarVariants, Avatar as default }
