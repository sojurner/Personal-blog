import React from "react"

import ClickAwayListener from "@components/ClickAwayListener"

import searchStyles from "./Search.module.scss"
import { PKVariant } from "@typings/component"

interface PKSearchVariant extends PKVariant {
  default: string
}

const searchVariants: PKSearchVariant = Object.freeze({
  primary: searchStyles.searchPrimary,
  secondary: searchStyles.searchSecondary,
  default: searchStyles.searchDefault,
})

type SearchVariantKey = keyof typeof searchVariants

export interface PKSearchComponent
  extends React.HTMLAttributes<HTMLDivElement> {
  variant: SearchVariantKey
  className?: string
}

const Search: React.FC<PKSearchComponent> = ({
  variant,
  className,
  ...props
}) => {
  const [inputExpanded, setInputExpanded] = React.useState(false)
  const ref = React.useRef(null)

  const classes = `${searchStyles.searchBase} ${searchVariants[variant]} ${
    inputExpanded && searchStyles.searchActive
  } ${className && className}`.trim()

  const toggleInput = () => {
    setInputExpanded(state => {
      if (!state && ref.current) {
        ref.current.focus()
      }
      return !state
    })
  }

  return (
    <>
      <div className={classes} {...props}>
        <span onClick={toggleInput.bind(null)}>
          <label>🔍</label>
        </span>
        <input ref={ref} />
      </div>
      {inputExpanded && <ClickAwayListener onClick={toggleInput} />}
    </>
  )
}

export { Search as default }
