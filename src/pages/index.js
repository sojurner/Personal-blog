import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { AniFadeLink, AniLoaderLink } from "@components/Link"
import { SaxophoneCat, DrummerCat } from "@components/Svg"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import { RefMainLayout } from "@components/Layouts"

import Flex from "@components/Flex"
import Tag from "@components/Tag"
import SEO from "@components/SEO"

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
            fields {
              slug
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
      <SEO />
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
                I started this website as a creative and therapeutic outlet.
                I'll share all that I know, and all that I've wondered through{" "}
                <Link to="/blog">my blog</Link>.
              </Typography>
              <Typography variant="neutralLight" tag="h4">
                Hope you enjoy!
              </Typography>
              <AniFadeLink
                to="/about"
                className="page-home__about-section__link"
              >
                <Typography variant="neutralBlank" tag="h4">
                  More About Me
                </Typography>
              </AniFadeLink>
            </Flex>
          </Flex>

          <Flex className="page-home__about-section--inner">
            <Flex
              className="page-home__about-section__txt"
              classes={["flexColumn"]}
            >
              <Typography variant="neutralDark" tag="h2">
                Call me, Maybe?
              </Typography>
              <div className="page-home__about-section__divider" />

              <Typography tag="h4" variant="neutralLight">
                As a full-stack developer, here are the technology stacks I'm
                familiar with:
              </Typography>
              <Flex className="page-home__about-section__skill-icons">
                <Icon color="var(--pk-color-neutral-900)" svg="csharp" />
                <Icon color="var(--pk-color-neutral-900)" svg="javascript" />
                <Icon color="var(--pk-color-neutral-900)" svg="typescript" />
                <Icon color="var(--pk-color-neutral-900)" svg="dotnet" />
                <Icon color="var(--pk-color-neutral-900)" svg="react" />
                <Icon color="var(--pk-color-neutral-900)" svg="sass" />
                <Icon color="var(--pk-color-neutral-900)" svg="docker" />
              </Flex>
              <Typography variant="neutralLight" tag="h4">
                If you like what you see, feel free to reach out!
              </Typography>
              <AniFadeLink
                to="/contact"
                className="page-home__about-section__link"
              >
                <Typography variant="neutralBlank" tag="h4">
                  Contact
                </Typography>
              </AniFadeLink>
            </Flex>
            <Flex className="page-home__about-section__img page-home__about-section__img-drummer-cat">
              <DrummerCat />
            </Flex>
          </Flex>
        </Flex>
        <Flex classes={["flexColumn"]} className="page-home__post-section">
          <Typography tag="h1" variant="neutralDark">
            Latest Posts
          </Typography>
          <Flex
            className="page-home__post-section__cards-container"
            classes={["flexRow", "justifyContentAround", "flexWrap"]}
          >
            {data.allMarkdownRemark.edges.map(edge => {
              const { frontmatter, fields } = edge.node
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
                    <img
                      src={frontmatter.featuredImgUrl}
                      alt="blog front img"
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
            className="page-home__post-section__link-blog"
          >
            <Typography variant="neutralBlank" tag="h4">
              View More
            </Typography>
          </AniFadeLink>
        </Flex>
      </Flex>
    </RefMainLayout>
  )
}

export default HomePage
