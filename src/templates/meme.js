// import React from "react"
// import { graphql, Link } from "gatsby"
// import Img from "gatsby-image"

// import MainLayout from "@components/Layouts"
// import SEO from "@components/SEO"
// import Button from "@components/Button"
// import Flex from "@components/Flex"
// import Chip from "@components/Chip"
// import Typography from "@components/Typography"
// import Icon from "@components/Icon"

// import "@styles/templates/_memeTemplate.scss"
// import { tagIconRef } from "../utils/constants"
// import { useMemeView } from "../hooks"

// const UPVOTE = "upvote"
// const DOWNVOTE = "downvote"

// const Meme = ({ data, location }) => {
//   const {
//     title: _title,
//     tags: _tags,
//     timestamp: _timestamp,
//     source: _src,
//     contentful_id,
//     img: _img,
//   } = data.contentfulMeme
//   let { nodes: memeSuggestions } = data.allContentfulMeme
//   memeSuggestions = memeSuggestions.sort((a, b) => 0.5 - Math.random()).slice(0, 6)

//   const [memePts, updatePoints] = useMemeView(contentful_id)
//   const [voteSession, setVoteSession] = React.useState("")
//   const [notification, setNotification] = React.useState(false)

//   const onMemeVote = action => {
//     updatePoints(action === UPVOTE ? 1 : -1)
//     setVoteSession(action)
//   }

//   const onMemeCopyLink = () => {
//     const el = document.createElement("textarea")
//     el.value = location.href

//     el.setAttribute("readonly", "")
//     el.style.position = "absolute"
//     el.style.opacity = 0

//     document.body.appendChild(el)
//     el.select()

//     document.execCommand("copy")
//     document.body.removeChild(el)

//     setNotification(true)
//     setTimeout(() => {
//       setNotification(false)
//     }, 4000)
//   }

//   return (
//     <MainLayout className="page-meme">
//       <SEO title={_title} />
//       <Flex className="meme" classes={["flexColumn"]}>
//         <Flex className="meme-title">
//           <Typography tag="h3" variant="neutralDefault">
//             {_title}
//           </Typography>
//         </Flex>

//         <Flex
//           className="meme-info"
//           classes={["flexRow", "justifyContentBetween", "alignItemsCenter"]}
//         >
//           <Typography className="meme-date" tag="span" variant="neutralLight">
//             {_timestamp}
//           </Typography>
//           <Flex className="meme-tags">
//             {_tags.split(",").map((tag, index) => (
//               <Chip
//                 variant="default"
//                 label={tag}
//                 key={`filter-chip-${index}`}
//                 icon={tagIconRef[tag]}
//               />
//             ))}
//           </Flex>
//         </Flex>
//         <Img className="meme-img" fluid={_img.fluid} />
//         <Flex className="meme-footer" classes={["flexRow", "alignItemsCenter"]}>
//           <Flex
//             className="meme-stats"
//             classes={["flexRow", "alignItemsCenter"]}
//           >
//             <Icon svg="uparrow" variant="neutralLight" />
//             <Typography tag="p" variant="neutralLight">
//               {Boolean(memePts) ? memePts : 0}
//             </Typography>
//           </Flex>
//           <Flex
//             className="meme-actions"
//             classes={["flexRow", "justifyContentCenter"]}
//           >
//             <Button
//               className="meme-vote meme-vote--up"
//               variant={
//                 voteSession
//                   ? voteSession === UPVOTE
//                     ? "positiveActive"
//                     : "positive"
//                   : "positive"
//               }
//               onClick={() => onMemeVote(UPVOTE)}
//             >
//               <Icon svg="upfinger" />
//             </Button>
//             <Button
//               className="meme-vote meme-vote--down"
//               variant={
//                 voteSession
//                   ? voteSession === DOWNVOTE
//                     ? "negativeActive"
//                     : "negative"
//                   : "negative"
//               }
//               onClick={() => onMemeVote(DOWNVOTE)}
//             >
//               <Icon svg="downfinger" />
//             </Button>
//           </Flex>
//           <Flex className="meme-social">
//             {_src && (
//               <Button
//                 onClick={() => window.open(_src, "_blank")}
//                 variant="default"
//                 className="meme-social__src-link"
//               >
//                 <Icon svg="link" />
//                 <Typography tag="span">src</Typography>
//               </Button>
//             )}
//             <Button
//               onClick={onMemeCopyLink}
//               variant="secondary"
//               className="meme-social__share"
//             >
//               <Icon svg="link" />
//             </Button>
//           </Flex>
//         </Flex>
//       </Flex>
//       <Flex
//         className="other-memes"
//         classes={["flexColumn", "alignItemsCenter"]}
//       >
//         <Typography className="other-memes-title" tag="h2">
//           Other Memes
//         </Typography>
//         <Flex>
//           <div className="other-memes-group">
//             {memeSuggestions.map((meme, index) => (
//               <Link
//                 key={`${meme.title}-${index}`}
//                 to={`/meme/${meme.contentful_id}`}
//               >
//                 <Flex
//                   className="other-memes-img-container"
//                   classes={["flexColumn", "justifyContentCenter"]}
//                 >
//                   <Img className="other-memes-img" fluid={meme.img.fluid} />
//                   <Typography tag="p" variant="neutralLight">
//                     {meme.title}
//                   </Typography>
//                 </Flex>
//               </Link>
//             ))}
//           </div>
//         </Flex>
//       </Flex>
//       <Flex
//         className={`notification-clipboard notification--${
//           Boolean(notification) ? "show" : "hide"
//         }`}
//       >
//         <Icon svg="link" />
//         <Typography>Copied Link!</Typography>
//       </Flex>
//     </MainLayout>
//   )
// }

// const query = graphql`
//   query($id: String!) {
//     contentfulMeme(contentful_id: { eq: $id }) {
//       title
//       tags
//       timestamp(formatString: "MMM DD, YYYY")
//       source
//       contentful_id
//       img {
//         fluid(maxWidth: 700) {
//           ...GatsbyContentfulFluid
//         }
//       }
//     }
//     allContentfulMeme(
//       filter: { contentful_id: { ne: $id } }
//     ) {
//       nodes {
//         title
//         contentful_id
//         img {
//           fluid(maxWidth: 800) {
//             ...GatsbyContentfulFluid
//           }
//         }
//       }
//     }
//   }
// `

// export { query, Meme as default }
