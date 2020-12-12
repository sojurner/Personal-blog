import React from "react"

function GradientWrapper() {
  return (
    <div
      style={{
        position: "fixed",
        left: "0px",
        right: "0px",
        top: "60px",
        width: "98%",
        pointerEvents: "none",
        transform: "translateY(-1px)",
        zIndex: 2
      }}
    >
      <svg height="75" width="100%" preserveAspectRatio="none" viewBox="0 0 10 30">
        <defs>
          <linearGradient
            id="eased-gradient-gradient-standard-layout"
            x1="0%"
            x2="0%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#fff"></stop>
            <stop offset="8.1%" stopColor="#fff" stopOpacity="0.987"></stop>
            <stop offset="15.5%" stopColor="#fff" stopOpacity="0.951"></stop>
            <stop offset="22.5%" stopColor="#fff" stopOpacity="0.896"></stop>
            <stop offset="29%" stopColor="#fff" stopOpacity="0.825"></stop>
            <stop offset="35.3%" stopColor="#fff" stopOpacity="0.741"></stop>
            <stop offset="47.1%" stopColor="#fff" stopOpacity="0.55"></stop>
            <stop offset="52.9%" stopColor="#fff" stopOpacity="0.45"></stop>
            <stop offset="58.8%" stopColor="#fff" stopOpacity="0.352"></stop>
            <stop offset="64.7%" stopColor="#fff" stopOpacity="0.259"></stop>
            <stop offset="71%" stopColor="#fff" stopOpacity="0.175"></stop>
            <stop offset="77.5%" stopColor="#fff" stopOpacity="0.104"></stop>
            <stop offset="84.5%" stopColor="#fff" stopOpacity="0.05"></stop>
            <stop offset="91.9%" stopColor="#fff" stopOpacity="0.013"></stop>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <mask id="eased-gradient-mask-standard-layout">
          <rect
            width="100%"
            height="100%"
            fill="url(#eased-gradient-gradient-standard-layout)"
          ></rect>
        </mask>
        <rect
          width="100%"
          height="100%"
          fill="var(--pk-color-bg-main)"
          mask="url(#eased-gradient-mask-standard-layout)"
          style={{
            WebkitTransition: "fill 350ms ease 0s",
            transition: "fill 350ms ease 0s",
          }}
        ></rect>
      </svg>
    </div>
  )
}

export default GradientWrapper
