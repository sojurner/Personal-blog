import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { AniFadeLink, AniLoaderLink } from "@components/Link"
import { SaxophoneCat, DrummerCat } from "@components/Svg"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import MainLayout from "@components/Layouts"
import Flex from "@components/Flex"
import Tag from "@components/Tag"
import Avatar from "@components/Avatar"
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
      file(relativePath: { eq: "images/avatar-cartoon_pk-2.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMarkdownRemark(limit: 4) {
        edges {
          node {
            frontmatter {
              title
              desc
              subject
              date
              tags
              foregroundImg
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <MainLayout className="page-home">
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
              classes={["flexColumn"]}
              className="page-home__landing-header-txt"
            >
              <Flex
                classes={["flexColumn"]}
                className="page-home__landing-header-txt__name"
              >
                <Typography
                  className="page-home__landing-header-txt__firstname"
                  tag="h1"
                  variant="neutralDark"
                >
                  <Typography tag="span">P</Typography>
                  aul
                </Typography>
                <Typography
                  className="page-home__landing-header-txt__lastname"
                  tag="h1"
                  variant="neutralDark"
                >
                  <Typography tag="span">K</Typography> im
                </Typography>
              </Flex>
            </Flex>
            <Avatar
              className="page-home__landing-front-img"
              shape="hexagon"
              fluid={data.file.childImageSharp.fluid}
              alt={data.site.siteMetadata.author
                .split(" ")
                .map(x => x[0])
                .join("")}
            />
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
                Hey there, Lurker!
              </Typography>
              <Typography tag="h4" variant="neutralLight">
                I started this website as a creative and therapeutic outlet.
                I'll share all that I know, and all that I've wondered through{" "}
                <Link to="/blog">my blog</Link>.
              </Typography>
              <Typography variant="neutralLight" tag="h4">
                Hope You enjoy!
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
              <Typography tag="h4" variant="neutralLight">
                As a full-stack dev, here are the technology stacks I'm familiar
                with:
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
                If you like my content, feel free to reach out!
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
                    className="page-home__post-section__card"
                  >
                    <img src={frontmatter.foregroundImg} alt="blog front img" />
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
    </MainLayout>
  )
}

export default HomePage
