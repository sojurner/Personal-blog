import React from "react"

import MainLayout from "@components/Layouts"
import Flex from "@components/Flex"
import Typography from "@components/Typography"
import { ContactCard } from "@components/Card"
import { ContactForm } from "@components/Form"

import "@styles/index.scss"
import "@styles/pages/_contactPage.scss"

const Contact = () => (
  <MainLayout className="page-contact">
    <Flex classes={["flexColumn", "alignItemsCenter"]} className="page-contact__content-section--inner">
      <Typography
        variant="secondaryDark"
        className="page-contact__title"
        tag="h1"
      >
        Reach out!
      </Typography>
      <Flex classes={["flexRow"]} className="page-contact__content-container">
        {/* <GrungeBG className="page-contact__content__grunge-bg" /> */}
        <ContactCard />
        <div className="page-contact__content__divider" />
        <ContactForm />
      </Flex>
    </Flex>
  </MainLayout>
)

export default Contact
