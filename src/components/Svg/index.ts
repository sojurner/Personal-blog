import BrushStroke from "./BrushStroke"
import InkGrunge from "./InkGrunge"
import SplashGrunge from "./SplashGrunge"
import DripGrunge from "./DripGrunge"

import Logo from "./Logo"
import OldManAndTheSea from "./OldManAndTheSea"
import StarCurrent from "./StarCurrent"

interface PKSvgComponent extends React.HTMLAttributes<HTMLOrSVGElement> {
  className?: string
}

export {
  PKSvgComponent,
  Logo,
  BrushStroke,
  InkGrunge,
  SplashGrunge,
  DripGrunge,
  OldManAndTheSea,
  StarCurrent
}
