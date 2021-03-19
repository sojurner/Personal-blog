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
import { AniLoaderLink } from "@components/Link"

import "@styles/pages/_memes.scss"
import { memes, tagIconRef } from "../utils/constants"
import { useMemeMeta } from "../hooks"

const MemesPage = ({ location }) => {
  const [memeSession, setMemeSession] = React.useState({})
  const [notification, setNotification] = React.useState(false)
  const [memeState, updateMemePoints] = useMemeMeta()

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

  const onMemeCopyLink = path => {
    const el = document.createElement("textarea")
    el.value = `${location.origin}/meme/${path}`
    console.log(location)

    el.setAttribute("readonly", "")
    el.style.position = "absolute"
    el.style.opacity = 0

    document.body.appendChild(el)
    el.select()

    document.execCommand("copy")
    document.body.removeChild(el)

    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, 4000)
  }

  return (
    <MainLayout className="page-memes">
      <SEO title="Memes" />
      <Flex className="memes" classes={["flexColumn"]}>
        {data.allFile.edges.map(({ node }, index) => {
          return node.childImageSharp ? (
            <div key={`meme-${index}`}>
              <Flex className="meme" classes={["flexColumn"]}>
                <AniLoaderLink className="meme-link--title" to={`/meme/${node.name}`}>
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
                      {memes[node.name].tags.map((tag, i) => (
                        <Chip
                          variant="default"
                          label={tag}
                          key={`chip-${node.name}-${i}`}
                          icon={tagIconRef[tag]}
                        />
                      ))}
                    </Flex>
                  </Flex>
                </AniLoaderLink>
                <AniLoaderLink className="meme-link--img" to={`/meme/${node.name}`}>
                  <Img
                    className="meme-img"
                    key={`img-${index}`}
                    fluid={node.childImageSharp.fluid}
                  />
                </AniLoaderLink>
                <Flex
                  className="meme-footer"
                  classes={["flexRow", "alignItemsCenter"]}
                >
                  {memeState && (
                    <Flex
                      className="meme-stats"
                      classes={["flexRow", "alignItemsCenter"]}
                    >
                      <Icon svg="uparrow" variant="neutralDark" />
                      <Typography tag="p" variant="neutralDark">
                        {memeState[node.name].points}
                      </Typography>
                    </Flex>
                  )}
                  <Flex
                    className="meme-actions"
                    classes={["flexRow", "justifyContentCenter"]}
                  >
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
                  <Button
                    onClick={() => onMemeCopyLink(node.name)}
                    variant="secondary"
                    className="meme-share"
                  >
                    <Icon svg="link" />
                  </Button>
                </Flex>
              </Flex>
              {index < data.allFile.edges.length - 1 && (
                <Divider className="meme-divider" />
              )}
            </div>
          ) : null
        })}
      </Flex>
      <Flex
        className={`notification-clipboard notification--${
          Boolean(notification) ? "show" : "hide"
        }`}
      >
        <Icon svg="link" />
        <Typography>Copied Link!</Typography>
      </Flex>
    </MainLayout>
  )
}

export default MemesPage
