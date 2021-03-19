import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import MainLayout from "@components/Layouts"
import SEO from "@components/SEO"
import Button from "@components/Button"
import Flex from "@components/Flex"
import Chip from "@components/Chip"
import Divider from "@components/Divider"
import Typography from "@components/Typography"
import Icon from "@components/Icon"

import "@styles/pages/_memes.scss"
import { memes, tagIconRef } from "../utils/constants"
import { useMemeMeta } from "../hooks"

const MemesPage = () => {
  const [memeSession, setMemeSession] = React.useState({})
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          extension: { regex: "/(jpeg|jpg|gif|png)/" }
          relativePath: { regex: "/memes/" }
        }
      ) {
        edges {
          node {
            name
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const onMemeVote = (id, vote) => {
    setMemeSession(state => ({ ...state, [id]: vote }))
    updateMemePoints(id, vote)
  }

  const [memeState, updateMemePoints] = useMemeMeta()

  return (
    <MainLayout className="page-memes">
      <SEO title="Memes" />
      <Flex className="memes" classes={["flexColumn"]}>
        {data.allFile.edges.map(({ node }, index) => {
          return node.childImageSharp ? (
            <>
              <Flex
                key={`meme-${index}`}
                className="meme"
                classes={["flexColumn"]}
              >
                <Flex className="meme-title">
                  <Typography tag="h3" variant="neutralDefault">
                    {memes[node.name].title}
                  </Typography>
                </Flex>
                <Flex
                className="meme-info"
                  classes={[
                    "flexRow",
                    "justifyContentBetween",
                    "alignItemsCenter",
                  ]}
                >
                  <Typography tag="span" variant="neutralDark">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(memes[node.name].timestamp))}
                  </Typography>
                  <Flex className="meme-tags">
                    {memes[node.name].tags.map(tag => (
                      <>
                        <Chip
                          variant="default"
                          label={tag}
                          key={`filter-chip-${index}`}
                          icon={tagIconRef[tag]}
                        />
                      </>
                    ))}
                  </Flex>
                </Flex>
                <Img
                  className="meme-img"
                  key={`img-${index}`}
                  fluid={node.childImageSharp.fluid}
                />
                {memeState && (
                  <Flex className="meme-stats" classes={["flexRow","alignItemsCenter"]}>
                    <Icon svg="uparrow" variant="neutralDark" />
                    <Typography tag="p" variant="neutralDark">
                      {memeState[node.name].points}
                    </Typography>
                  </Flex>
                )}
                <Flex classes={["flexRow", "justifyContentCenter"]}>
                  <Button
                    className="meme-vote meme-vote--up"
                    variant={
                      memeSession.hasOwnProperty(node.name)
                        ? memeSession[node.name]
                          ? "positiveActive"
                          : "positive"
                        : "positive"
                    }
                    onClick={() => onMemeVote(node.name, true)}
                  >
                    <Icon svg="upfinger" />
                  </Button>
                  <Button
                    className="meme-vote meme-vote--down"
                    variant={
                      memeSession.hasOwnProperty(node.name)
                        ? memeSession[node.name]
                          ? "negative"
                          : "negativeActive"
                        : "negative"
                    }
                    onClick={() => onMemeVote(node.name, false)}
                  >
                    <Icon svg="downfinger" />
                  </Button>
                </Flex>
              </Flex>
              {index < data.allFile.edges.length - 1 && (
                <Divider className="meme-divider" />
              )}
            </>
          ) : null
        })}
      </Flex>
    </MainLayout>
  )
}

export default MemesPage
