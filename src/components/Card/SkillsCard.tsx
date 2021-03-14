import React from "react"
import ReactTooltip from "react-tooltip"

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
            <ReactTooltip
              id="icon-csharp"
              backgroundColor="var(--pk-color-icon-csharp)"
              type="dark"
              effect="solid"
            >
              <span>C#</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-csharp"
              color="var(--pk-color-icon-csharp)"
              svg="csharp"
            />

            <ReactTooltip
              id="icon-js"
              backgroundColor="var(--pk-color-icon-js)"
              type="light"
              effect="solid"
            >
              <span>JavaScript</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-js"
              color="var(--pk-color-icon-js)"
              svg="javascript"
            />

            <ReactTooltip
              id="icon-ts"
              backgroundColor="var(--pk-color-icon-ts)"
              type="dark"
              effect="solid"
            >
              <span>TypeScript</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-ts"
              color="var(--pk-color-icon-ts)"
              svg="typescript"
            />

            <ReactTooltip
              id="icon-html"
              backgroundColor="var(--pk-color-icon-html)"
              type="dark"
              effect="solid"
            >
              <span>HTML5</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-html"
              color="var(--pk-color-icon-html)"
              svg="html"
            />

            <ReactTooltip
              id="icon-css"
              backgroundColor="var(--pk-color-icon-css)"
              type="dark"
              effect="solid"
            >
              <span>CSS3</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-css"
              color="var(--pk-color-icon-css)"
              svg="css"
            />
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
            <ReactTooltip
              id="icon-react"
              backgroundColor="var(--pk-color-icon-react)"
              type="light"
              effect="solid"
            >
              <span>ReactJS</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-react"
              color="var(--pk-color-icon-react)"
              svg="react"
            />

            <ReactTooltip
              id="icon-dotnet"
              backgroundColor="var(--pk-color-icon-dotnet)"
              type="dark"
              effect="solid"
            >
              <span>Asp.net core</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-dotnet"
              color="var(--pk-color-icon-dotnet)"
              svg="dotnet"
            />

            <ReactTooltip
              id="icon-blazor"
              backgroundColor="var(--pk-color-icon-dotnet)"
              type="dark"
              effect="solid"
            >
              <span>Blazor</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-blazor"
              color="var(--pk-color-icon-dotnet)"
              svg="blazor"
            />

            <ReactTooltip
              id="icon-node"
              backgroundColor="var(--pk-color-icon-node)"
              type="dark"
              effect="solid"
            >
              <span>NodeJS</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-node"
              color="var(--pk-color-icon-node)"
              svg="nodejs"
            />

            <ReactTooltip
              id="icon-sass"
              backgroundColor="var(--pk-color-icon-sass)"
              type="dark"
              effect="solid"
            >
              <span>SASS</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-sass"
              color="var(--pk-color-icon-sass)"
              svg="sass"
            />
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
            <ReactTooltip
              id="icon-vscode"
              backgroundColor="var(--pk-color-icon-vscode)"
              type="dark"
              effect="solid"
            >
              <span>VS Code</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-vscode"
              color="var(--pk-color-icon-vscode)"
              svg="vscode"
            />

            <ReactTooltip
              id="icon-vs"
              backgroundColor="var(--pk-color-icon-vs)"
              type="dark"
              effect="solid"
            >
              <span>Visual Studio</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-vs"
              color="var(--pk-color-icon-vs)"
              svg="vs"
            />

            <ReactTooltip
              id="icon-docker"
              backgroundColor="var(--pk-color-icon-docker)"
              type="dark"
              effect="solid"
            >
              <span>Docker</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-docker"
              color="var(--pk-color-icon-docker)"
              svg="docker"
            />

            <ReactTooltip
              id="icon-gitlab"
              backgroundColor="var(--pk-color-icon-gitlab)"
              type="dark"
              effect="solid"
            >
              <span>Gitlab</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-gitlab"
              color="var(--pk-color-icon-gitlab)"
              svg="gitlab"
            />

            <ReactTooltip
              id="icon-github"
              backgroundColor="var(--pk-color-icon-github)"
              type="dark"
              effect="solid"
            >
              <span>Github</span>
            </ReactTooltip>
            <Icon
              data-tip
              data-for="icon-github"
              color="var(--pk-color-icon-github)"
              svg="github"
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default SkillsCard
