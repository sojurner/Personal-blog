import React from "react"

import Footer from "@components/Footer"
import GradientWrapper from "../../assets/GradientWrapper.svg"
import Header, { TemplateHeader } from "@components/Header"

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  className: string
}

interface TemplateLayoutProps extends LayoutProps {
  inView: boolean
}

const UnderFade = () => (
  <div
    style={{
      position: "fixed",
      left: "0px",
      right: "0px",
      top: "60px",
      width: "98%",
      pointerEvents: "none",
      transform: "translateY(-1px)",
      zIndex: 2,
    }}
  >
    <GradientWrapper />
  </div>
)

const MainLayout: React.FC<LayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main className={`${className || ""} page-base`} {...props}>
      <Header />
      <UnderFade />
      <section className={`${className}__content-section`}>{children}</section>
      <Footer />
    </main>
  )
}

const TemplateLayout: React.FC<TemplateLayoutProps> = ({
  children,
  className,
  inView,
  ...props
}) => (
  <main className={`${className || ""} page-base`} {...props}>
    <TemplateHeader fixed={!inView} />
    {!inView && <UnderFade />}
    <section className={`${className}__content-section`}>{children}</section>
    <Footer />
  </main>
)

const RefMainLayout = React.forwardRef<HTMLInputElement, LayoutProps>(
  ({ children, className, ...props }, ref) => (
    <main ref={ref} className={`${className || ""} page-base`} {...props}>
      <Header />
      <UnderFade />
      <section className={`${className}__content-section`}>{children}</section>
      <Footer />
    </main>
  )
)

const RefTemplateLayout = React.forwardRef<
  HTMLInputElement,
  TemplateLayoutProps
>(({ children, className, inView, ...props }, ref) => (
  <main ref={ref} className={`${className || ""} page-base`} {...props}>
    <TemplateHeader fixed={!inView} />
    {!inView && <UnderFade />}
    <section className={`${className}__content-section`}>{children}</section>
    <Footer />
  </main>
))

export {
  RefMainLayout,
  TemplateLayout,
  RefTemplateLayout,
  MainLayout as default,
}
