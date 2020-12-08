import React from "react"

import flexStyles from "./Flex.module.scss"

const flexClasses = Object.freeze({
  flexRow: flexStyles["flexRow"],
  flexColumn: flexStyles["flexColumn"],
  flexRowReverse: flexStyles["flexRowReverse"],
  flexColumnReverse: flexStyles["flexColumnReverse"],
  flexWrap: flexStyles["flexWrap"],
  flexNowrap: flexStyles["flexNowrap"],
  flexWrapReverse: flexStyles["flexWrapReverse"],
  flexShow: flexStyles["flexShow"],
  flexHide: flexStyles["flexHide"],
  flexResizeUnset: flexStyles["flexResizeUnset"],
  flexResizeGrow: flexStyles["flexResizeGrow"],
  flexResizeInitial: flexStyles["flexResizeInitial"],
  flexResizeFill: flexStyles["flexResizeFill"],
  flexResizeAuto: flexStyles["flexResizeAuto"],
  flexResizeNone: flexStyles["flexResizeNone"],
  flexResizeNogrow: flexStyles["flexResizeNogrow"],
  flexResizeNoshrink: flexStyles["flexResizeNoshrink"],
  justifyContentStart: flexStyles["justifyContentStart"],
  justifyContentEnd: flexStyles["justifyContentEnd"],
  justifyContentCenter: flexStyles["justifyContentCenter"],
  justifyContentBetween: flexStyles["justifyContentBetween"],
  justifyContentAround: flexStyles["justifyContentAround"],
  alignItemsStart: flexStyles["alignItemsStart"],
  alignItemsEnd: flexStyles["alignItemsEnd"],
  alignItemsCenter: flexStyles["alignItemsCenter"],
  alignItemsBaseline: flexStyles["alignItemsBaseline"],
  alignItemsStretch: flexStyles["alignItemsStretch"],
  alignContentStart: flexStyles["alignContentStart"],
  alignContentEnd: flexStyles["alignContentEnd"],
  alignContentCenter: flexStyles["alignContentCenter"],
  alignContentBetween: flexStyles["alignContentBetween"],
  alignContentAround: flexStyles["alignContentAround"],
  alignContentStretch: flexStyles["alignContentStretch"],
  alignSelfAuto: flexStyles["alignSelfAuto"],
  alignSelfStart: flexStyles["alignSelfStart"],
  alignSelfEnd: flexStyles["alignSelfEnd"],
  alignSelfCenter: flexStyles["alignSelfCenter"],
  alignSelfBaseline: flexStyles["alignSelfBaseline"],
  alignSelfStretch: flexStyles["alignSelfStretch"],
  order0: flexStyles["order0"],
  order1: flexStyles["order1"],
  order2: flexStyles["order2"],
  order3: flexStyles["order3"],
  order4: flexStyles["order4"],
  order5: flexStyles["order5"],
  order6: flexStyles["order6"],
  order7: flexStyles["order7"],
  order8: flexStyles["order8"],
  order9: flexStyles["order9"],
  order10: flexStyles["order10"],
  order11: flexStyles["order11"],
  order12: flexStyles["order12"],
})

type FlexClassKey = keyof typeof flexClasses

interface PKFlexComponent extends React.HTMLAttributes<HTMLElement> {
  classes?: FlexClassKey[]
  className?: string
}

const Flex: React.FC<PKFlexComponent> = ({ classes, className, ...props }) => {
  const stringifiedClasses = classes
    ?.reduce((str, classKey) => `${str} ${flexClasses[classKey]}`, "")
    .concat(` ${className || ""}`)
    .trim()

  return <div className={stringifiedClasses} {...props}></div>
}

Flex.defaultProps = {
  classes: ["flexRow"],
}

export { flexClasses, PKFlexComponent, Flex as default }
