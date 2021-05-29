import React from "react"
import loadable from "@loadable/component"
import { graphql, useStaticQuery } from "gatsby"

import { RefMainLayout } from "@components/Layouts"

import "@styles/pages/_memes.scss"
import { useMemeMeta, useInfiniteScroll } from "@utils/hooks"

const Img = loadable(() => import("gatsby-image"))
const SEO = loadable(() => import("@components/SEO"))
const Button = loadable(() => import("@components/Button"))
const Flex = loadable(() => import("@components/Flex"))
const Divider = loadable(() => import("@components/Divider"))
const Typography = loadable(() => import("@components/Typography"))
const Icon = loadable(() => import("@components/Icon"))

const MemesPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMeme(sort: { fields: [date], order: DESC }) {
        totalCount
        nodes {
          id
          title
          src
          date(formatString: "MMM DD, YYYY")
          image {
            fluid(
              maxWidth: 550
              forceBlurhash: false
              imgixParams: { fm: "jpg", auto: "compress" }
            ) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  `)

  let endRange = 3
  if (location.hash) {
    const index =
      data.allDatoCmsMeme.nodes.findIndex(
        x => x.id === location.hash.slice(1)
      ) + 1
    endRange = index > endRange ? index : endRange
  }

  const [mainRef, itemRange] = useInfiniteScroll([0, endRange], data.totalCount)

  return (
    <RefMainLayout ref={mainRef} className="page-memes">
      <SEO title="Memes" />
      <MemesControl>
        {data.allDatoCmsMeme.nodes.slice(...itemRange).map((node, index) => {
          return (
            <MemePost key={`post-ref-${index}`} id={node.id}>
              <MemeHeader title={node.title} timestamp={node.date} />
              {node.image && (
                <MemeImg durationFadeIn={200} fluid={node.image.fluid} />
              )}
              <MemeAction id={node.id}>
                <MemeVoting id={node.id} />
                <MemeSocial
                  rootUrl={location.origin}
                  id={node.id}
                  source={node.src}
                />
              </MemeAction>
            </MemePost>
          )
        })}
      </MemesControl>
    </RefMainLayout>
  )
}

const MemeContext = React.createContext()

const MemesControl = props => {
  const [memeMeta, updateMemeMeta] = useMemeMeta()

  const onUpVote = React.useCallback(
    id => {
      updateMemeMeta(id)
    },
    [updateMemeMeta]
  )

  return (
    <MemeContext.Provider value={[memeMeta, onUpVote]}>
      <Flex className="memes" classes={["flexColumn"]} {...props}></Flex>
    </MemeContext.Provider>
  )
}

const MemePost = React.memo(
  ({ id, children }) => {
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
  },
  (prev, next) => prev.id === next.id && prev.children === next.children
)

const MemeHeader = ({ title, timestamp }) => {
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
      </Flex>
    </>
  )
}

const MemeImg = props => <Img className="meme-img" {...props} />

// ----------{ voting ---------- //

const MemeVoting = ({ id, ...props }) => {
  const [, onUpVote] = React.useContext(MemeContext)
  const [voted, setVoted] = React.useState(false)

  const handleUpVote = React.useCallback(() => {
    onUpVote(id)
    setVoted(true)
  }, [setVoted, onUpVote, id])

  return (
    <Flex
      className="meme-actions"
      classes={["flexRow", "justifyContentCenter"]}
      {...props}
    >
      <MemeUpvote
        onClick={handleUpVote}
        variant={!voted ? "positive" : "positiveActive"}
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

const MemeSocial = ({ id, source, rootUrl }) => {
  const [notification, setNotification] = React.useState("")

  const onCopyLink = React.useCallback(() => {
    const el = document.createElement("textarea")
    el.value = `${rootUrl}/memes/#${id}`

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
  }, [rootUrl, id, setNotification])

  return (
    <Flex className="meme-social">
      {source && <MemeSrc onClick={() => window.open(source, "_blank")} />}
      <MemeShare onClick={onCopyLink} />
      <MemeNotification notification={notification} />
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

const MemeNotification = ({ notification, ...props }) => {
  return (
    <Flex
      className={`notification-clipboard notification--${Boolean(notification) ? "show" : "hide"
        }`}
      {...props}
    >
      <Icon svg="share" />
      <Typography>Copied Link!</Typography>
    </Flex>
  )
}

export default MemesPage
