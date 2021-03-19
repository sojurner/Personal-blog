import React from "react"

import Footer from "@components/Footer"
import { GradientWrapper } from "@components/Svg"
import Header, { TemplateHeader } from "@components/Header"

interface LayoutProps extends React.HTMLAttributes<HTMLElement> {
  className: string
}

interface TemplateLayoutProps extends LayoutProps {
  inView: boolean
}

const MainLayout: React.FC<LayoutProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <main className={`${className || ""} page-base`} {...props}>
      <Header />
      <GradientWrapper />
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
    {!inView && <GradientWrapper />}
    <section className={`${className}__content-section`}>{children}</section>
    <Footer />
  </main>
)

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
