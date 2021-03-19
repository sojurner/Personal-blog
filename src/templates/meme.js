import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import MainLayout from "@components/Layouts"
import SEO from "@components/SEO"
import Button from "@components/Button"
import Flex from "@components/Flex"
import Chip from "@components/Chip"
import Typography from "@components/Typography"
import Icon from "@components/Icon"

import "@styles/templates/_memeTemplate.scss"
import { memes, tagIconRef } from "../utils/constants"
import { useMemeView } from "../hooks"

const UPVOTE = "upvote"
const DOWNVOTE = "downvote"

const Meme = ({ data, location }) => {
  const { name, childImageSharp } = data.file

  const [memePts, updatePoints, error, landing] = useMemeView(name)
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
      <SEO title={"meme"} />
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
          <Typography tag="span" variant="neutralDark">
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
            <Icon svg="uparrow" variant="neutralDark" />
            <Typography tag="p" variant="neutralDark">
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
                  ? voteSession == DOWNVOTE
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
        className=
        {`notification-clipboard notification--${
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
  }
`

export { query, Meme as default }
