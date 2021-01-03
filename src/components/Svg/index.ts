import BrushStroke from "./BrushStroke"
import InkGrunge from "./InkGrunge"
import SplashGrunge from "./SplashGrunge"
import DripGrunge from "./DripGrunge"
import GrungeBG from "./GrungeBG"

import OldManAndTheSea from "./OldManAndTheSea"
import DrummerCat from "./DrummerCat"
import SaxophoneCat from "./SaxophoneCat"
import StarCurrent from "./StarCurrent"
import GradientWrapper from "./GradientWrapper"

import Logo from "./Logo"
import Wings from './Wings';

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
  StarCurrent,
  GrungeBG,
  SaxophoneCat,
  DrummerCat,
  GradientWrapper,
  Wings
}
