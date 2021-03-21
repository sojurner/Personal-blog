import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import VSensor from "react-visibility-sensor"

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

  const [memeSession, setMemeSession] = React.useState({})
  const [notification, setNotification] = React.useState(false)
  const [visibleState, setVisibleState] = React.useState(
    data.allFile.edges.reduce((result, { node }) => {
      result[node.name] = false
      return result
    }, {})
  )

  const [memeState, updateMemePoints] = useMemeMeta()

  function onChange(isVisible, slug) {
    if (visibleState[slug]) return
    setVisibleState(state => ({ ...state, [slug]: isVisible }))
  }

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
        {data.allFile.edges.sort((a,b) => {
          return new Date(memes[b.node.name].timestamp) - new Date(memes[a.node.name].timestamp)
        }).map(({ node }, index) => {
          return (
            <VSensor
              key={`post-ref-${index}`}
              delayedCall={true}
              scrollDelay={500}
              onChange={isVisible => onChange(isVisible, node.name)}
              partialVisibility={true}
            >
              <div key={`meme-${index}`}>
                <Flex
                  className="meme"
                  classes={["flexColumn"]}
                >
                  <AniLoaderLink
                    className="meme-link--title"
                    to={`/meme/${node.name}`}
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
                      <Typography
                        className="meme-date"
                        tag="span"
                        variant="neutralLight"
                      >
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
                  {node.childImageSharp && visibleState[node.name] && (
                    <AniLoaderLink
                      className="meme-link--img"
                      to={`/meme/${node.name}`}
                    >
                      <Img
                        className="meme-img"
                        key={`img-${index}`}
                        fluid={node.childImageSharp.fluid}
                      />
                    </AniLoaderLink>
                  )}

                  <Flex
                    className="meme-footer"
                    classes={["flexRow", "alignItemsCenter"]}
                  >
                    {memeState && (
                      <Flex
                        className="meme-stats"
                        classes={["flexRow", "alignItemsCenter"]}
                      >
                        <Icon svg="uparrow" variant="neutralLight" />
                        <Typography tag="p" variant="neutralLight">
                          {memeState[node.name]
                            ? memeState[node.name].points
                            : 0}
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
                    <Flex className="meme-social">
                      {memes[node.name].src && (
                        <Button
                          onClick={() =>
                            window.open(memes[node.name].src, "_blank")
                          }
                          variant="default"
                          className="meme-src-link"
                        >
                          <Icon svg="link" />
                          <Typography tag="span">src</Typography>
                        </Button>
                      )}

                      <Button
                        onClick={() => onMemeCopyLink(node.name)}
                        variant="secondary"
                        className="meme-share"
                      >
                        <Icon svg="share" />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                {index < data.allFile.edges.length - 1 && (
                  <Divider className="meme-divider" />
                )}
              </div>
            </VSensor>
          )
        })}
      </Flex>
      <Flex
        className={`notification-clipboard notification--${
          Boolean(notification) ? "show" : "hide"
        }`}
      >
        <Icon svg="share" />
        <Typography>Copied Link!</Typography>
      </Flex>
    </MainLayout>
  )
}

export default MemesPage
