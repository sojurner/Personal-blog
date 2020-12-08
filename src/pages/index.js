import React from "react"
import { Link, graphql } from "gatsby"

import MainLayout from "@components/Layouts"

import "@styles/index.scss"

const Home = () => (
  <MainLayout className="page-home">
    <h1>Hello</h1>
    <h2>I'm Paul, Full-stack dev</h2>
    <p>
      Need a dev? <Link to="/contact">Contact me</Link>
    </p>
  </MainLayout>
)

export default Home
