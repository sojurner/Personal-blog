import React from "react"
import Card, { PKCardComponent } from "."
import Icon from "@components/Icon"
import Flex from "@components/Flex"
import Typography from "@components/Typography"

import "./_customCard.scss"

const contactInfo = [
  {
    icon: "email",
    iconColor: "var(--pk-color-icon-email)",
    label: "Email",
    value: "paul.kim.0591@protonmail",
  },
  {
    icon: "github",
    iconColor: "var(--pk-color-icon-github)",
    label: "Github",
    value: "@sojurner",
    link: "https://github.com/sojurner",
  },
  {
    icon: "linkedIn",
    iconColor: "var(--pk-color-icon-linkedIn)",
    label: "LinkedIn",
    value: "@paulkim-sojurner",
    link: "https://www.linkedin.com/in/paulkim-sojurner/",
  },
]

const ContactCard: React.FC<PKCardComponent> = ({ className, ...props }) => {
  return (
    <Card
      className={`card-contact ${className}`}
      classes={["flexColumn"]}
      {...props}
    >
      <Typography tag="h3" variant="secondaryDark">
        Contact
      </Typography>

      {contactInfo.map((ele, index) => (
        <Flex
          key={`contact-item-${index}`}
          className="card-contact__content-container"
          classes={["flexRow", "alignItemsCenter"]}
        >
          <Icon
            color={ele.iconColor}
            className="card-contact__content__title-icon"
            svg={ele.icon}
          />
          <Flex
            classes={["flexColumn"]}
            className="card-contact__content__txt-container"
          >
            <Typography
              className="card-contact__content__txt-label"
              tag="span"
              variant="secondaryDark"
            >
              {ele.label}
            </Typography>
            <Typography
              className={`card-contact__content__txt-value ${
                ele.link ? "pointer" : ""
              }`}
              variant="secondaryDark"
              onClick={() => {
                if (ele.link) window.open(ele.link, "_blank")
              }}
            >
              {ele.value}
            </Typography>
          </Flex>
        </Flex>
      ))}
    </Card>
  )
}

export default ContactCard
