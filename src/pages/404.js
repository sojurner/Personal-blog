import React from "react"

import Flex from "@components/Flex"
import Typography from "@components/Typography"
import MainLayout from "@components/Layouts"

import "@styles/pages/_404Page.scss"
import f04 from "../images/404Patrol.jpeg"

const Four0Four = () => {
  return (
    <MainLayout className="page-404">
      <Typography className="page-404__title" variant="defaultDark" tag="h1">
        Page Not Found!
      </Typography>
      <Flex classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}>
        <Typography className="page-404__4" variant="negativeDefault" tag="h1">
          4
        </Typography>
        <img alt="404 patrol" src={f04} className="page-404__feature-img" />
        <Typography className="page-404__4" variant="negativeDefault" tag="h1">
          4
        </Typography>
      </Flex>
    </MainLayout>
  )
}

export default Four0Four
