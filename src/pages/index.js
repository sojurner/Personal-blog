import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import MainLayout from "@components/Layouts"
import Flex from "@components/Flex"
import { AniFadeLink, AniLoaderLink } from "@components/Link"
import Tag from "@components/Tag"
import Typography from "@components/Typography"
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
          classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
          className="page-home__landing-header"
        >
          <Flex
            classes={["flexColumn"]}
            className="page-home__landing-header-txt"
          >
            <Typography tag="h1" variant="neutralDark">
              Greetings, I'm Paul.
            </Typography>
            <Typography tag="h4" variant="neutralLight">
              I started this website as a creative and therapeutic outlet. I'll
              share all that I know, and all that I've wondered through{" "}
              <Link to="/blog">my blog</Link>.
            </Typography>
            <Typography
              variant="neutralLight"
              style={{
                margin: "0 0 2em 0",
              }}
              tag="h4"
            >
              Hope You enjoy!
            </Typography>

            <AniFadeLink
              to="/about"
              className="page-home__landing-header__link-about"
            >
              <Typography variant="neutralBlank" tag="h4">
                More About Me
              </Typography>
            </AniFadeLink>
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
