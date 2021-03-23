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
import { tagIconRef } from "../utils/constants"
import { useMemeMeta } from "../hooks"

const MemesPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulMeme(
        sort: { fields: [timestamp], order: DESC }
      ) {
        nodes {
          title
          tags
          source
          timestamp(formatString: "MMM DD, YYYY")
          contentful_id
          img {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  const [memeSession, setMemeSession] = React.useState({})
  const [notification, setNotification] = React.useState(false)
  const [visibleState, setVisibleState] = React.useState(
    data.allContentfulMeme.nodes.reduce((result, node) => {
      result[node.contentful_id] = false
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
        {data.allContentfulMeme.nodes.map((node, index) => {
          return (
            <VSensor
              key={`post-ref-${index}`}
              delayedCall={true}
              scrollDelay={500}
              onChange={isVisible => onChange(isVisible, node.contentful_id)}
              partialVisibility={true}
            >
              <div key={`meme-${index}`}>
                <Flex className="meme" classes={["flexColumn"]}>
                  <AniLoaderLink
                    className="meme-link--title"
                    to={`/meme/${node.contentful_id}`}
                  >
                    <Flex className="meme-title">
                      <Typography tag="h3" variant="neutralDefault">
                        {node.title}
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
                        {node.timestamp}
                      </Typography>
                      <Flex className="meme-tags">
                        {node.tags.split(",").map((tag, i) => (
                          <Chip
                            variant="default"
                            label={tag}
                            key={`chip-${node.contentful_id}-${i}`}
                            icon={tagIconRef[tag]}
                          />
                        ))}
                      </Flex>
                    </Flex>
                  </AniLoaderLink>
                  {node.img && visibleState[node.contentful_id] && (
                    <AniLoaderLink
                      className="meme-link--img"
                      to={`/meme/${node.contentful_id}`}
                    >
                      <Img
                        className="meme-img"
                        key={`img-${index}`}
                        fluid={node.img.fluid}
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
                          {memeState[node.contentful_id]
                            ? memeState[node.contentful_id].points
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
                          memeSession.hasOwnProperty(node.contentful_id)
                            ? memeSession[node.contentful_id]
                              ? "positiveActive"
                              : "positive"
                            : "positive"
                        }
                        onClick={() => onMemeVote(node.contentful_id, true)}
                      >
                        <Icon svg="upfinger" />
                      </Button>
                      <Button
                        className="meme-vote meme-vote--down"
                        variant={
                          memeSession.hasOwnProperty(node.contentful_id)
                            ? memeSession[node.contentful_id]
                              ? "negative"
                              : "negativeActive"
                            : "negative"
                        }
                        onClick={() => onMemeVote(node.contentful_id, false)}
                      >
                        <Icon svg="downfinger" />
                      </Button>
                    </Flex>
                    <Flex className="meme-social">
                      {node.source && (
                        <Button
                          onClick={() => window.open(node.source, "_blank")}
                          variant="default"
                          className="meme-social__src-link"
                        >
                          <Icon svg="link" />
                          <Typography tag="span">src</Typography>
                        </Button>
                      )}

                      <Button
                        onClick={() => onMemeCopyLink(node.contentful_id)}
                        variant="secondary"
                        className="meme-social__share"
                      >
                        <Icon svg="share" />
                      </Button>
                    </Flex>
                  </Flex>
                </Flex>
                {index < data.allContentfulMeme.nodes.length - 1 && (
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
