import React from "react"

import Footer from "@components/Footer"
import { GradientWrapper } from "@components/Svg"
import Header from "@components/Header"

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

export { RefMainLayout, MainLayout as default }
