import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import MainLayout from "@components/Layouts"
import SEO from "@components/SEO"
import Button from "@components/Button"
import Flex from "@components/Flex"
import Chip from "@components/Chip"
import Typography from "@components/Typography"
import Icon from "@components/Icon"
import Carousel from "@components/Carousel"
import { AniFadeLink } from "@components/Link"

import "@styles/templates/_memeTemplate.scss"
import { memes, tagIconRef } from "../utils/constants"
import { useMemeView } from "../hooks"

const UPVOTE = "upvote"
const DOWNVOTE = "downvote"

const Meme = ({ data, location }) => {
  const { name, childImageSharp } = data.file
  let { edges } = data.allFile
  edges = edges.sort((a, b) => 0.5 - Math.random())

  const [memePts, updatePoints] = useMemeView(name)
  const [voteSession, setVoteSession] = React.useState("")
  const [notification, setNotification] = React.useState(false)

  const onMemeVote = action => {
    updatePoints(action === UPVOTE ? 1 : -1)
    setVoteSession(action)
  }

  const onMemeCopyLink = () => {
    const el = document.createElement("textarea")
    el.value = location.href

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
    <MainLayout className="page-meme">
      <SEO title={memes[name].title} />
      <Flex className="meme" classes={["flexColumn"]}>
        <Flex className="meme-title">
          <Typography tag="h3" variant="neutralDefault">
            {memes[name].title}
          </Typography>
        </Flex>

        <Flex
          className="meme-info"
          classes={["flexRow", "justifyContentBetween", "alignItemsCenter"]}
        >
          <Typography className="meme-date" tag="span" variant="neutralLight">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(new Date(memes[name].timestamp))}
          </Typography>
          <Flex className="meme-tags">
            {memes[name].tags.map((tag, index) => (
              <Chip
                variant="default"
                label={tag}
                key={`filter-chip-${index}`}
                icon={tagIconRef[tag]}
              />
            ))}
          </Flex>
        </Flex>

        <Img className="meme-img" fluid={childImageSharp.fluid} />
        <Flex className="meme-footer" classes={["flexRow", "alignItemsCenter"]}>
          <Flex
            className="meme-stats"
            classes={["flexRow", "alignItemsCenter"]}
          >
            <Icon svg="uparrow" variant="neutralLight" />
            <Typography tag="p" variant="neutralLight">
              {Boolean(memePts) ? memePts : 0}
            </Typography>
          </Flex>
          <Flex
            className="meme-actions"
            classes={["flexRow", "justifyContentCenter"]}
          >
            <Button
              className="meme-vote meme-vote--up"
              variant={
                voteSession
                  ? voteSession === UPVOTE
                    ? "positiveActive"
                    : "positive"
                  : "positive"
              }
              onClick={() => onMemeVote(UPVOTE)}
            >
              <Icon svg="upfinger" />
            </Button>
            <Button
              className="meme-vote meme-vote--down"
              variant={
                voteSession
                  ? voteSession === DOWNVOTE
                    ? "negativeActive"
                    : "negative"
                  : "negative"
              }
              onClick={() => onMemeVote(DOWNVOTE)}
            >
              <Icon svg="downfinger" />
            </Button>
          </Flex>
          <Button
            onClick={onMemeCopyLink}
            variant="secondary"
            className="meme-share"
          >
            <Icon svg="link" />
          </Button>
        </Flex>
      </Flex>
      <Flex
        className="other-memes"
        classes={["flexColumn", "alignItemsCenter"]}
      >
        <Typography className="other-memes-title" tag="h2">
          Other Memes
        </Typography>
        <Flex>
          <div className="other-memes-group">
            {edges.map(({ node }, index) => (
              <AniFadeLink
                key={`${node.name}-${index}`}
                to={`/meme/${node.name}`}
              >
                <Flex
                  className="other-memes-img-container"
                  classes={["flexColumn", "justifyContentCenter"]}
                >
                  <Img
                    className="other-memes-img"
                    fluid={node.childImageSharp.fluid}
                  />
                  <Typography tag="p" variant="neutralLight">
                    {memes[node.name].title}
                  </Typography>
                </Flex>
              </AniFadeLink>
            ))}
          </div>
        </Flex>
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

const query = graphql`
  query($name: String!) {
    file(name: { eq: $name }) {
      name
      childImageSharp {
        fluid(maxWidth: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allFile(
      limit: 6
      filter: {
        extension: { regex: "/(jpeg|jpg|gif|png)/" }
        relativePath: { regex: "/memes/" }
        name: { ne: $name }
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
`

export { query, Meme as default }
