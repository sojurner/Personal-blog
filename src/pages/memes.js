import React from 'react'
import loadable from '@loadable/component'
import { graphql, useStaticQuery } from "gatsby"

import { RefMainLayout } from "@components/Layouts"

import "@styles/pages/_memes.scss"
import { tagIconRef } from "../utils/constants"
import { useMemeMeta, useInfiniteScroll } from "../hooks"

const Img = loadable(() => import("gatsby-image"))
const SEO = loadable(() => import("@components/SEO"))
const Button = loadable(() => import("@components/Button"))
const Flex = loadable(() => import("@components/Flex"))
const Chip = loadable(() => import("@components/Chip"))
const Divider = loadable(() => import("@components/Divider"))
const Typography = loadable(() => import("@components/Typography"))
const Icon = loadable(() => import("@components/Icon"))

const MemesPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulMeme(sort: { fields: [timestamp], order: DESC }) {
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
  const [notification, setNotification] = React.useState("")

  const [memeState, updateMemePoints] = useMemeMeta()
  const [mainRef, itemRange] = useInfiniteScroll(
    [0, 3],
    data.allContentfulMeme.nodes.length
  )

  const onMemeVote = (id, vote) => {
    setMemeSession(state => ({ ...state, [id]: vote }))
    updateMemePoints(id, vote)
  }

  const onMemeCopyLink = path => {
    const el = document.createElement("textarea")
    el.value = `${location.origin}/memes#${path}`

    el.setAttribute("readonly", "")
    el.style.position = "absolute"
    el.style.opacity = 0

    document.body.appendChild(el)
    el.select()

    document.execCommand("copy")
    document.body.removeChild(el)

    setNotification("Copied Link!")
    setTimeout(() => {
      setNotification("")
    }, 4000)
  }

  return (
    <RefMainLayout ref={mainRef} className="page-memes">
      <SEO title="Memes" />
      <Flex className="memes" classes={["flexColumn"]}>
        {data.allContentfulMeme.nodes.slice(...itemRange).map((node, index) => {
          return (
            <MemePost key={`post-ref-${index}`} id={node.contentful_id}>
              <MemeHeader
                title={node.title}
                timestamp={node.timestamp}
                tags={node.tags}
              />
              {node.img && <MemeImg fluid={node.img.fluid} />}
              <MemeAction memeVote={memeState[node.contentful_id]}>
                <MemeVoting
                  memeSession={memeSession[node.contentful_id]}
                  onMemeVote={bool => onMemeVote(node.contentful_id, bool)}
                />
                <MemeSocial
                  onMemeCopyLink={() => onMemeCopyLink(node.contentful_id)}
                  source={node.source}
                />
              </MemeAction>
            </MemePost>
          )
        })}
      </Flex>
      <MemeNotification
        className={`notification-clipboard notification--${
          Boolean(notification) ? "show" : "hide"
        }`}
      >
        {notification}
      </MemeNotification>
    </RefMainLayout>
  )
}

const MemePost = ({ id, children }) => {
  return (
    <div style={{ position: "relative" }}>
      <span
        id={id}
        style={{ position: "absolute", top: "-100px", opacity: 0 }}
      />
      <Flex className="meme" classes={["flexColumn"]}>
        {children}
      </Flex>
      <Divider className="meme-divider" />
    </div>
  )
}

const MemeHeader = ({ title, timestamp, tags }) => (
  <>
    <Flex className="meme-title">
      <Typography tag="h3" variant="neutralDefault">
        {title}
      </Typography>
    </Flex>

    <Flex
      className="meme-info"
      classes={["flexRow", "justifyContentBetween", "alignItemsCenter"]}
    >
      <Typography className="meme-date" tag="span" variant="neutralLight">
        {timestamp}
      </Typography>
      <Flex className="meme-tags">
        {tags.split(",").map((tag, i) => (
          <Chip
            variant="default"
            label={tag}
            key={`chip-meme-${i}`}
            icon={tagIconRef[tag]}
          />
        ))}
      </Flex>
    </Flex>
  </>
)

const MemeImg = ({ fluid }) => <Img className="meme-img" fluid={fluid} />

// ----------{ voting ---------- //

const MemeVoting = ({ onMemeVote, memeSession }) => {
  return (
    <Flex
      className="meme-actions"
      classes={["flexRow", "justifyContentCenter"]}
    >
      <MemeUpvote
        onUpvote={() => onMemeVote(true)}
        variant={
          memeSession === undefined
            ? "positive"
            : memeSession
            ? "positiveActive"
            : "positive"
        }
      />
      <MemeDownvote
        onDownvote={() => onMemeVote(false)}
        variant={
          memeSession === undefined
            ? "negative"
            : memeSession
            ? "negative"
            : "negativeActive"
        }
      />
    </Flex>
  )
}

const MemeUpvote = ({ onUpvote, variant }) => {
  return (
    <Button
      className="meme-vote meme-vote--up"
      variant={variant}
      onClick={onUpvote}
    >
      <Icon svg="upfinger" />
    </Button>
  )
}

const MemeDownvote = ({ onDownvote, variant }) => {
  return (
    <Button
      className="meme-vote meme-vote--down"
      variant={variant}
      onClick={onDownvote}
    >
      <Icon svg="downfinger" />
    </Button>
  )
}

// ---------- voting }---------- //

// ----------{ Social ---------- //

const MemeSocial = ({ source, onMemeCopyLink }) => (
  <Flex className="meme-social">
    {source && <MemeSrc onClick={() => window.open(source, "_blank")} />}
    <MemeShare onClick={onMemeCopyLink} />
  </Flex>
)

const MemeSrc = props => (
  <Button variant="default" className="meme-social__src-link" {...props}>
    <Icon svg="link" />
    <Typography tag="span">src</Typography>
  </Button>
)

const MemeShare = props => (
  <Button variant="secondary" className="meme-social__share" {...props}>
    <Icon svg="share" />
  </Button>
)

const MemeAction = ({ memeVote, children }) => (
  <Flex className="meme-footer" classes={["flexRow", "alignItemsCenter"]}>
    <Flex className="meme-stats" classes={["flexRow", "alignItemsCenter"]}>
      <Icon svg="uparrow" variant="neutralLight" />
      <Typography tag="p" variant="neutralLight">
        {memeVote ? memeVote.points : 0}
      </Typography>
    </Flex>
    {children}
  </Flex>
)

// ---------- Social }---------- //

const MemeNotification = props => (
  <Flex {...props}>
    <Icon svg="share" />
    <Typography>Copied Link!</Typography>
  </Flex>
)

export default MemesPage
