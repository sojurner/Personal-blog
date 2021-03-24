import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import ReactTooltip from "react-tooltip"
import Carousel from "react-alice-carousel"

import { AniFadeLink, AniLoaderLink } from "@components/Link"
import { SaxophoneCat, DrummerCat } from "@components/Svg"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import { RefMainLayout } from "@components/Layouts"
import Flex from "@components/Flex"
import Tag from "@components/Tag"
import SEO from "@components/SEO"
import Button from "@components/Button"

import { blogTypeRef } from "../utils/constants"
import "@styles/index.scss"
import "@styles/pages/_homePage.scss"

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          location
          phone
          email
        }
      }
      file(relativePath: { eq: "images/avatar-bitmap.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              desc
              subject
              date(formatString: "MMM DD, YYYY")
              tags
              featuredImgUrl
            }
            featuredImg {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
      allContentfulMeme(limit: 9, sort: { fields: [timestamp], order: DESC }) {
        nodes {
          title
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

  const mainRef = React.useRef()
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => setLoaded(true), 1000)
  }, [])

  return (
    <RefMainLayout ref={mainRef} className="page-home">
      <SEO title={data.site.siteMetadata.author} />
      <Flex className="page-home__landing-container" classes={["flexColumn"]}>
        <Flex
          classes={["flexColumn", "alignItemsCenter", "justifyContentCenter"]}
          className="page-home__landing-container--inner"
        >
          <Flex
            classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
            className="page-home__landing-header"
          >
            <Flex
              classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
              className="page-home__landing-header__txt"
            >
              <Img
                className="page-home__landing-header__front-img"
                shape="hexagon"
                fluid={data.file.childImageSharp.fluid}
                alt={data.site.siteMetadata.author
                  .split(" ")
                  .map(x => x[0])
                  .join("")}
              />
              <svg
                className="page-home__landing-header__curved-svg"
                viewBox="0 0 500 500"
              >
                <path
                  id="curve"
                  d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
                />
                <text width="500">
                  <textPath xlinkHref="#curve">Software Developer</textPath>
                </text>
              </svg>
              <Flex
                classes={["flexColumn"]}
                className={`page-home__landing-header__txt-name ${
                  loaded && "page-home__landing-header__txt-name--loaded"
                }`}
              >
                <Typography
                  className="page-home__landing-header__txt-firstname"
                  tag="h1"
                  variant="primaryDark"
                >
                  PAUL
                </Typography>
                <Typography
                  className="page-home__landing-header__txt-lastname"
                  tag="h1"
                  variant="secondaryDark"
                >
                  KIM
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="page-home__about-section" classes={["flexColumn"]}>
          <Flex className="page-home__about-section--inner">
            <Flex className="page-home__about-section__img page-home__about-section__img-sax-cat">
              <SaxophoneCat />
            </Flex>
            <Flex
              className="page-home__about-section__txt"
              classes={["flexColumn"]}
            >
              <Typography variant="neutralDark" tag="h2">
                Welcome!
              </Typography>
              <div className="page-home__about-section__divider" />

              <Typography tag="h4" variant="neutralLight">
                I started this website as a <em>creative</em> and{" "}
                <em>therapeutic</em> outlet. I'll share all that I know, and all
                that I've wondered through my blog.
              </Typography>

              <AniFadeLink
                to="/blog"
                className="page-home__about-section__link"
              >
                <Button variant="primary">Go to blog</Button>
              </AniFadeLink>
            </Flex>
          </Flex>

          <Flex className="page-home__about-section--inner">
            <Flex
              className="page-home__about-section__txt"
              classes={["flexColumn"]}
            >
              <Typography variant="neutralDark" tag="h2">
                About
              </Typography>
              <div className="page-home__about-section__divider" />

              <Typography tag="h4" variant="neutralLight">
                As a full-stack developer, here are some technologies I'm most
                familiar with:
              </Typography>
              <Flex
                className="page-home__about-section__skill-icons"
                classes={["flexColumn", "alignItemsCenter"]}
              >
                <Flex>
                  <ReactTooltip
                    id="icon-js"
                    backgroundColor="var(--pk-color-icon-js)"
                    type="light"
                    effect="solid"
                  >
                    <span>JavaScript</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-js"
                    color="var(--pk-color-icon-js)"
                    svg="javascript"
                  />

                  <ReactTooltip
                    id="icon-ts"
                    backgroundColor="var(--pk-color-icon-ts)"
                    type="dark"
                    effect="solid"
                  >
                    <span>TypeScript</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-ts"
                    color="var(--pk-color-icon-ts)"
                    svg="typescript"
                  />
                  <ReactTooltip
                    id="icon-node"
                    backgroundColor="var(--pk-color-icon-node)"
                    type="dark"
                    effect="solid"
                  >
                    <span>NodeJS</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-node"
                    color="var(--pk-color-icon-node)"
                    svg="nodejs"
                  />
                  <ReactTooltip
                    id="icon-react"
                    backgroundColor="var(--pk-color-icon-react)"
                    type="light"
                    effect="solid"
                  >
                    <span>ReactJS</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-react"
                    color="var(--pk-color-icon-react)"
                    svg="react"
                  />
                </Flex>
                <Flex>
                  <ReactTooltip
                    id="icon-csharp"
                    backgroundColor="var(--pk-color-icon-csharp)"
                    type="dark"
                    effect="solid"
                  >
                    <span>C#</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-csharp"
                    color="var(--pk-color-icon-csharp)"
                    svg="csharp"
                  />
                  <ReactTooltip
                    id="icon-dotnet"
                    backgroundColor="var(--pk-color-icon-dotnet)"
                    type="dark"
                    effect="solid"
                  >
                    <span>Asp.net core</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-dotnet"
                    color="var(--pk-color-icon-dotnet)"
                    svg="dotnet"
                  />
                  <ReactTooltip
                    id="icon-blazor"
                    backgroundColor="var(--pk-color-icon-dotnet)"
                    type="dark"
                    effect="solid"
                  >
                    <span>Blazor</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-blazor"
                    color="var(--pk-color-icon-dotnet)"
                    svg="blazor"
                  />
                </Flex>
                <Flex>
                  <ReactTooltip
                    id="icon-html"
                    backgroundColor="var(--pk-color-icon-html)"
                    type="dark"
                    effect="solid"
                  >
                    <span>HTML5</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-html"
                    color="var(--pk-color-icon-html)"
                    svg="html"
                  />
                  <ReactTooltip
                    id="icon-sass"
                    backgroundColor="var(--pk-color-icon-sass)"
                    type="dark"
                    effect="solid"
                  >
                    <span>SASS</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-sass"
                    color="var(--pk-color-icon-sass)"
                    svg="sass"
                  />
                  <ReactTooltip
                    id="icon-css"
                    backgroundColor="var(--pk-color-icon-css)"
                    type="dark"
                    effect="solid"
                  >
                    <span>CSS3</span>
                  </ReactTooltip>
                  <Icon
                    data-tip
                    data-for="icon-css"
                    color="var(--pk-color-icon-css)"
                    svg="css"
                  />
                </Flex>
              </Flex>
              <AniFadeLink
                to="/about"
                className="page-home__about-section__link"
              >
                <Button variant="secondary">More about me</Button>
              </AniFadeLink>
            </Flex>
            <Flex className="page-home__about-section__img page-home__about-section__img-drummer-cat">
              <DrummerCat />
            </Flex>
          </Flex>
        </Flex>
        <Flex classes={["flexColumn"]} className="page-home__post-section">
          <Typography className="extended-title" tag="h1" variant="neutralDark">
            Latest Blogs
          </Typography>

          <Flex
            className="page-home__post-section__cards-container"
            classes={["flexRow", "justifyContentAround", "flexWrap"]}
          >
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const { frontmatter, fields, featuredImg } = node
              return (
                <AniLoaderLink
                  key={`latest-posts-${frontmatter.title}`}
                  to={`blog/${frontmatter.subject}/${fields.slug}`}
                >
                  <Flex
                    classes={["flexColumn"]}
                    className={`page-home__post-section__card--${
                      blogTypeRef[frontmatter.subject].tagVariant
                    } page-home__post-section__card`}
                  >
                    <Img
                      fluid={featuredImg.childImageSharp.fluid}
                      src={frontmatter.featuredImgUrl}
                      alt="blog front img"
                      className={`page-home__post-section__card__img`}
                    />
                    <Typography variant="neutralDark" tag="h3">
                      {frontmatter.title}
                    </Typography>
                    <Flex
                      className="page-home__post-section__card__date-tag"
                      classes={["flexRow", "alignItemsCenter"]}
                    >
                      <Typography tag="label" variant="neutralLight">
                        {frontmatter.date}
                      </Typography>
                      <Tag
                        className="page-home__post-section__card__tag"
                        label={frontmatter.subject}
                        variant={blogTypeRef[frontmatter.subject].tagVariant}
                      />
                    </Flex>
                    <Typography>{frontmatter.desc}</Typography>
                  </Flex>
                </AniLoaderLink>
              )
            })}
          </Flex>
          <AniFadeLink
            to="/blog"
            direction="left"
            className="page-home__post-section__link-blog to-section-btn-link"
          >
            <Button variant="default">More Posts</Button>
          </AniFadeLink>
        </Flex>

        <Flex className="memes" classes={["flexColumn", "alignItemsCenter"]}>
          <Typography
            className="memes-title extended-title"
            tag="h1"
            variant="neutralDark"
          >
            Latest Memes
          </Typography>
          <Flex className="memes-carousel">
            <Carousel
              responsive={{
                0: { items: 2 },
                568: { items: 2 },
                1024: { items: 3 },
              }}
              items={data.allContentfulMeme.nodes.map((node, index) => (
                <Link
                  key={`${node.contentful_id}-${index}`}
                  to={`/memes#${node.contentful_id}`}
                >
                  <Flex className="meme-img-container" classes={["flexCloumn"]}>
                    <Img className="meme-img" fluid={node.img.fluid} />
                    <Typography tag="p" variant="neutralLight">
                      {node.title}
                    </Typography>
                  </Flex>
                </Link>
              ))}
              className="memes-carousel"
            />
          </Flex>
          <AniLoaderLink
            to="/memes"
            direction="left"
            className="meme-all-link to-section-btn-link"
          >
            <Button variant="default">More Memes</Button>
          </AniLoaderLink>
        </Flex>
      </Flex>
    </RefMainLayout>
  )
}

export default HomePage
