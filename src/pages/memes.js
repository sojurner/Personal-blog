import React from "react"
import loadable from "@loadable/component"
import { graphql, useStaticQuery } from "gatsby"

import { RefMainLayout } from "@components/Layouts"

import "@styles/pages/_memes.scss"

import { tagIconRef } from "@utils/constants"
import { useMemeMeta, useInfiniteScroll } from "@utils/hooks"

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

  const [mainRef, itemRange] = useInfiniteScroll(
    [0, 3],
    data.allContentfulMeme.nodes.length
  )

  return (
    <RefMainLayout ref={mainRef} className="page-memes">
      <SEO title="Memes" />
      <MemesControl rootUrl={location.origin}>
        {data.allContentfulMeme.nodes.slice(...itemRange).map((node, index) => {
          return (
            <MemePost key={`post-ref-${index}`} id={node.contentful_id}>
              <MemeHeader
                title={node.title}
                timestamp={node.timestamp}
                tags={node.tags}
              />
              {node.img && (
                <MemeImg durationFadeIn={200} fluid={node.img.fluid} />
              )}
              <MemeAction id={node.contentful_id}>
                <MemeVoting id={node.contentful_id} />
                <MemeSocial id={node.contentful_id} source={node.source} />
              </MemeAction>
            </MemePost>
          )
        })}
        <MemeNotification />
      </MemesControl>
    </RefMainLayout>
  )
}

const MemeContext = React.createContext()

const MemesControl = ({ rootUrl, ...props }) => {
  const [memeSession, setMemeSession] = React.useState({})
  const [notification, setNotification] = React.useState("")
  const [memeMeta, updateMemeMeta] = useMemeMeta()

  const onUpVote = id => {
    setMemeSession(state => ({ ...state, [id]: true }))
    updateMemeMeta(id)
  }

  const onCopyLink = path => {
    const el = document.createElement("textarea")
    el.value = `${rootUrl}/memes#${path}`

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
    <MemeContext.Provider
      value={[memeMeta, memeSession, notification, onUpVote, onCopyLink]}
    >
      <Flex className="memes" classes={["flexColumn"]} {...props}></Flex>
    </MemeContext.Provider>
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

const MemeHeader = ({ title, timestamp, tags }) => {
  return (
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
}

const MemeImg = ({ fluid }) => <Img className="meme-img" fluid={fluid} />

// ----------{ voting ---------- //

const MemeVoting = ({ id, ...props }) => {
  const [, memeSession, , onUpVote] = React.useContext(MemeContext)

  return (
    <Flex
      className="meme-actions"
      classes={["flexRow", "justifyContentCenter"]}
      {...props}
    >
      <MemeUpvote
        onClick={React.useCallback(() => onUpVote(id), [id, onUpVote])}
        variant={
          memeSession[id] === undefined
            ? "positive"
            : memeSession[id]
            ? "positiveActive"
            : "positive"
        }
      />
    </Flex>
  )
}

const MemeUpvote = props => {
  return (
    <Button className="meme-vote meme-vote--up" aria-label="Up vote" {...props}>
      <Icon svg="thumbup" />
    </Button>
  )
}

// ---------- voting }---------- //

// ----------{ Social ---------- //

const MemeSocial = ({ id, source }) => {
  const [, , , , onCopyLink] = React.useContext(MemeContext)
  return (
    <Flex className="meme-social">
      {source && <MemeSrc onClick={() => window.open(source, "_blank")} />}
      <MemeShare
        onClick={React.useCallback(() => onCopyLink(id), [id, onCopyLink])}
      />
    </Flex>
  )
}

const MemeSrc = props => (
  <Button
    variant="default"
    aria-label="Source link"
    className="meme-social__src-link"
    {...props}
  >
    <Icon svg="link" />
    <Typography tag="span">src</Typography>
  </Button>
)

const MemeShare = props => (
  <Button
    aria-label="Copy link"
    variant="secondary"
    className="meme-social__share"
    {...props}
  >
    <Icon svg="share" />
  </Button>
)

const MemeAction = ({ id, children }) => {
  const [memeMeta] = React.useContext(MemeContext)
  return (
    <Flex className="meme-footer" classes={["flexRow", "alignItemsCenter"]}>
      <Flex className="meme-stats" classes={["flexRow", "alignItemsCenter"]}>
        <Icon svg="uparrow" variant="neutralLight" />
        <Typography tag="p" variant="neutralLight">
          {memeMeta[id] ? memeMeta[id].points : 0}
        </Typography>
      </Flex>
      {children}
    </Flex>
  )
}

// ---------- Social }---------- //

const MemeNotification = props => {
  const [, , notification] = React.useContext(MemeContext)

  return (
    <Flex
      className={`notification-clipboard notification--${
        Boolean(notification) ? "show" : "hide"
      }`}
      {...props}
    >
      <Icon svg="share" />
      <Typography>Copied Link!</Typography>
    </Flex>
  )
}

export default MemesPage
