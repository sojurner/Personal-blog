import React from "react"

import Footer from "@components/Footer"
import { GradientWrapper } from "@components/Svg"
import Header, { TemplateHeader } from "@components/Header"

const MainLayout = ({ children, className, ...props }) => {
  return (
    <main className={`${className || ""} page-base`} {...props}>
      <Header />
      <GradientWrapper />
      <section className={`${className}__content-section`}>{children}</section>
      <Footer />
    </main>
  )
}

const TemplateLayout = ({ children, className, inView, ...props }) => (
  <main className={`${className || ""} page-base`} {...props}>
    <TemplateHeader fixed={!inView} />
    {!inView && <GradientWrapper />}
    <section className={`${className}__content-section`}>{children}</section>
    <Footer />
  </main>
)

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  className: string
}

const RefMainLayout = React.forwardRef<HTMLInputElement, LayoutProps>(
  ({ children, className, ...props }, ref) => (
    <main ref={ref} className={`${className || ""} page-base`} {...props}>
      <Header />
      <GradientWrapper />
      <section className={`${className}__content-section`}>{children}</section>
      <Footer />
    </main>
  )
)

export { RefMainLayout, TemplateLayout, MainLayout as default }
