import React, { useEffect, useRef, useState } from "react"

import Flex from "@components/Flex"
import Button from "@components/Button"
import Icon from "@components/Icon"

import carouselStyles from "./Carousel.module.scss"

interface CarouselProps extends React.HTMLAttributes<HTMLElement> {
  chunk: number
}
const Carousel: React.FC<CarouselProps> = ({ children, ...props }) => {
  const childArray = React.Children.toArray(children)
  const [currentSlide, setCurrentSlide] = useState(1)
  const groupRefs = useRef({})

  const onSlide = bool => {
    console.log(window.innerWidth)
    if (!groupRefs.current[currentSlide]) return

    const increment =
      window.innerWidth > 1050 ? 3 : window.innerWidth > 750 ? 2 : 1

    setCurrentSlide(state => {
      let incrementOffset = state + (bool ? increment : -1 * increment)
      const targetRef = groupRefs.current[incrementOffset]

      if (!targetRef) return state

      targetRef.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      })


      const updateState = state + (bool ? increment : increment * -1)
      return updateState < 1
        ? 1
        : updateState > childArray.length
        ? childArray.length
        : updateState
    })
  }

  return (
    <Flex
      className={`${carouselStyles.carousel} ${props.className}`}
      classes={["flexRow", "alignItemsCenter"]}
    >
      {groupRefs.current && (
        <Button
          className={
            currentSlide === 1
              ? carouselStyles.caretDisabled
              : carouselStyles.caret
          }
          onClick={() => onSlide(false)}
        >
          <Icon svg="leftChevron" />
        </Button>
      )}
      <div className={carouselStyles.slideGroup}>
        {React.Children.map(children, (child, index) => (
          <div
            className={carouselStyles.slide}
            ref={el => (groupRefs.current[index + 1] = el)}
          >
            {child}
          </div>
        ))}
      </div>
      {groupRefs.current && (
        <Button className={
          currentSlide === childArray.length
            ? carouselStyles.caretDisabled
            : carouselStyles.caret
        } onClick={() => onSlide(true)}>
          <Icon svg="rightChevron" />
        </Button>
      )}
    </Flex>
  )
}

Carousel.defaultProps = {
  chunk: 3,
}

export default Carousel
