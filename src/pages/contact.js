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
    <Typography variant="secondaryDark" className="page-contact__title" tag="h1">
      Reach out!
    </Typography>
    <Flex classes={["flexRow"]}>
      <ContactCard />
      <div className="page-contact__divider" />
      <ContactForm />
    </Flex>
  </MainLayout>
)

export default Contact
