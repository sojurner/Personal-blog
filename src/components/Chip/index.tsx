import React from "react"

import Icon, { IconSvgKey } from "@components/Icon"
import Typography from "@components/Typography"
import Flex, { PKFlexComponent } from "@components/Flex"

import chipStyles from "./Chip.module.scss"
import { PKVariant } from "@typings/component"

interface PKChipVariant extends PKVariant {
  negative: string
  positive: string
  default: string
}

const chipVariants: PKChipVariant = Object.freeze({
  primary: chipStyles.chipPrimary,
  secondary: chipStyles.chipSecondary,
  negative: chipStyles.chipNegative,
  positive: chipStyles.chipPositive,
  neutral: chipStyles.chipNeutral,
  default: chipStyles.chipDefault,
})

type ChipVariantKey = keyof typeof chipVariants

export interface PKChipComponent extends PKFlexComponent {
  variant?: ChipVariantKey
  icon?: IconSvgKey
  label: string
}

const Chip: React.FC<PKChipComponent> = ({
  label,
  variant,
  children,
  icon,
  className,
  ...props
}) => {
  const classes: string = `${chipStyles.chipBase} ${chipVariants[variant]} ${
    className || ""
  }`.trim()

  return (
    <Flex className={classes} {...props}>
      {icon && (
        <Icon
          svg={icon}
          variant={variant != "default" ? "neutralBlank" : "neutralDark"}
        />
      )}
      <Typography
        tag={"span"}
        variant={variant != "default" ? "neutralBlank" : "neutralDark"}
      >
        {label}
      </Typography>
    </Flex>
  )
}

Chip.defaultProps = {
  variant: "default",
}

export { chipVariants, Chip as default }
