import React from "react"
import { PKSvgComponent } from "."

const Logo: React.FC<PKSvgComponent> = props => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      version="1"
      viewBox="0 0 202 136"
      fill="currentColor"
      {...props}
    >
      <g
        transform="translate(0.000000,136.000000) scale(0.050000,-0.050000)"
        fill="#e2a013"
        stroke="none"
      >
        <path
          fill="var(--pk-color-secondary-500)"
          d="M40 1340 l0 -1320 300 0 300 0 0 1320 0 1320 -300 0 -300 0 0 -1320z"
        ></path>
        <path
          d="M1252 2577 c347 -369 352 -1138 8 -1499 -104 -110 -109 -106 111 -93
1057 64 1057 1630 -1 1671 l-200 8 82 -87z"
          fill="var(--pk-color-primary-400)"
        ></path>
        <path
          d="M2810 2629 c158 -117 295 -313 351 -505 32 -106 12 -117 293 156 130
127 276 264 325 305 l88 75 -548 -1 c-490 0 -545 -3 -509 -30z"
          fill="var(--pk-color-negative-500)"
        ></path>
        <path
          d="M2635 1434 c-230 -218 -222 -180 -80 -361 63 -81 187 -248 275 -372
88 -124 235 -328 326 -453 l167 -228 340 0 c217 0 338 7 334 20 -7 18 -215
307 -808 1117 -131 179 -259 357 -284 395 -59 88 -45 95 -270 -118z"
          fill="var(--pk-color-positive-500)"
        ></path>
      </g>
    </svg>
  )
}

export default Logo
