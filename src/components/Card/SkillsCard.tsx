import React from "react"
import Card, { PKCardComponent } from "."
import Icon from "@components/Icon"
import Flex from "@components/Flex"
import Typography from "@components/Typography"

import "./_customCard.scss"

const SkillsCard: React.FC<PKCardComponent> = ({ className, ...props }) => {
  return (
    <Card
      className={`card-skills ${className}`}
      classes={["flexColumn"]}
      {...props}
    >
      <Typography tag="h3" variant="primaryDark">
        Skills
      </Typography>
      <Flex
        classes={["flexRow", "alignItemsCenter"]}
        className="card-skills__content__skillset-container"
      >
        <Icon
          className="card-skills__content__title-icon"
          color="var(--pk-color-icon-codetags)"
          svg="codetags"
        />
        <Flex
          classes={["flexColumn"]}
          className="card-skills__content__skillset-group"
        >
          <Typography
            className="card-skills__content__skillset-label"
            tag="span"
            variant="primaryDark"
          >
            Languages
          </Typography>
          <Flex className="card-skills__content__skillset-icons">
            <Icon color="var(--pk-color-icon-csharp)" svg="csharp" />
            <Icon color="var(--pk-color-icon-js)" svg="javascript" />
            <Icon color="var(--pk-color-icon-ts)" svg="typescript" />
            <Icon color="var(--pk-color-icon-html)" svg="html" />
            <Icon color="var(--pk-color-icon-css)" svg="css" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        classes={["flexRow", "alignItemsCenter"]}
        className="card-skills__content__skillset-container"
      >
        <Icon
          className="card-skills__content__title-icon"
          color="var(--pk-color-icon-web)"
          svg="web"
        />
        <Flex
          classes={["flexColumn"]}
          className="card-skills__content__skillset-group"
        >
          <Typography
            className="card-skills__content__skillset-label"
            tag="span"
            variant="primaryDark"
          >
            Frameworks
          </Typography>
          <Flex className="card-skills__content__skillset-icons">
            <Icon color="var(--pk-color-icon-react)" svg="react" />
            <Icon color="var(--pk-color-icon-node)" svg="nodejs" />
            <Icon color="var(--pk-color-icon-sass)" svg="sass" />
            <Icon color="var(--pk-color-icon-dotnet)" svg="dotnet" />
            <Icon color="var(--pk-color-icon-docker)" svg="docker" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        classes={["flexRow", "alignItemsCenter"]}
        className="card-skills__content__skillset-container"
      >
        <Icon
          className="card-skills__content__title-icon"
          color="var(--pk-color-icon-tools)"
          svg="tools"
        />
        <Flex
          classes={["flexColumn"]}
          className="card-skills__content__skillset-group"
        >
          <Typography
            className="card-skills__content__skillset-label"
            tag="span"
            variant="primaryDark"
          >
            Tools
          </Typography>
          <Flex className="card-skills__content__skillset-icons">
            <Icon color="var(--pk-color-icon-vscode)" svg="vscode" />
            <Icon color="var(--pk-color-icon-vs)" svg="vs" />
            <Icon color="var(--pk-color-icon-gitlab)" svg="gitlab" />
            <Icon color="var(--pk-color-icon-github--1)" svg="github" />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default SkillsCard
