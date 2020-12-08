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
          color="#4A546D"
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
            <Icon color="#652077" svg="csharp" />
            <Icon color="#F0DB4F" svg="javascript" />
            <Icon color="#0077C6" svg="typescript" />
            <Icon color="#EA6228" svg="html" />
            <Icon color="#3596D0" svg="css" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        classes={["flexRow", "alignItemsCenter"]}
        className="card-skills__content__skillset-container"
      >
        <Icon
          className="card-skills__content__title-icon"
          color="#a7c6f9"
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
            <Icon color="#61dafb" svg="react" />
            <Icon color="#88C349" svg="nodejs" />
            <Icon color="#CC6699" svg="sass" />
            <Icon color="#5C2D91" svg="dotnet" />
            <Icon color="#2396EE" svg="docker" />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        classes={["flexRow", "alignItemsCenter"]}
        className="card-skills__content__skillset-container"
      >
        <Icon
          className="card-skills__content__title-icon"
          color="#c3c3c3"
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
            <Icon color="#0077C6" svg="vscode" />
            <Icon color="#68217A" svg="vs" />
            <Icon color="#F56A25" svg="gitlab" />
            <Icon color="#5C2D91" svg="github" />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default SkillsCard
