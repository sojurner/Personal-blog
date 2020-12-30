import React from "react"

import { OldManAndTheSea } from "@components/Svg"
import Flex from "@components/Flex"
import Typography from "@components/Typography"
import MainLayout from "@components/Layouts"

import "@styles/pages/_404Page.scss"

const Four0Four = () => {
  return (
    <MainLayout className="page-404">
      <Typography className="page-404__title" tag="h1">
        Page Not Found!
      </Typography>
      <Flex classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}>
        <Typography className="page-404__4" tag="h1">
          4
        </Typography>
        <OldManAndTheSea className="page-404__feature-img" />
        <Typography className="page-404__4" tag="h1">
          4
        </Typography>
      </Flex>
    </MainLayout>
  )
}

export default Four0Four
