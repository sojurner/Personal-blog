import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

import { AniLoaderLink, AniFadeLink } from "@components/Link"
import MainLayout from "@components/Layouts"
import Typography from "@components/Typography"
import Flex from "@components/Flex"
import Divider from "@components/Divider"
import Tag from "@components/Tag"
import Icon from "@components/Icon"
import Avatar from "@components/Avatar"
import SEO from "@components/SEO"

import "@styles/templates/_blogTemplate.scss"
import { blogTypeRef } from "../utils/constants"
import { usePageView } from "../hooks"

const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        author
        subject
        desc
        next
        previous
        featuredImgAlt
        avatar {
          childImageSharp {
            fluid(maxWidth: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      featuredImg {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      fields {
        slug
      }
      html
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { ne: $slug } } }
      limit: 6
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            subject
            featuredImgAlt
          }
          featuredImg {
            childImageSharp {
              fluid(maxWidth: 400) {
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
  }
`

const Blog = ({ data }) => {
  const { frontmatter, fields, featuredImg, html } = data.markdownRemark
  const [viewCount] = usePageView(fields.slug)

  const createColumn = ele => {
    const { frontmatter, fields, featuredImg } = ele.node
    return (
      <div
        key={`related-${fields.slug}`}
        className="template-blog__related__card"
        depth="z4"
      >
        <AniLoaderLink to={`/blog/${frontmatter.subject}/${fields.slug}`}>
          <Img
            loading="lazy"
            fluid={featuredImg.childImageSharp.fluid}
            alt={frontmatter.featuredImgAlt}
          />
        </AniLoaderLink>
        <Flex
          classes={["flexColumn"]}
          className="template-blog__related__card-text"
        >
          <AniLoaderLink
            to={`/blog/${frontmatter.subject}/${fields.slug}`}
            key={`related-${fields.slug}`}
          >
            <Typography tag="h3">{frontmatter.title}</Typography>
          </AniLoaderLink>
          <Flex
            classes={["flexRow", "alignItemsCenter"]}
            className="template-blog__related__card__date-tag"
          >
            <AniFadeLink
              to={`/blog/${frontmatter.subject}`}
              key={`related-${fields.slug}`}
            >
              <Tag
                label={frontmatter.subject}
                variant={blogTypeRef[frontmatter.subject].tagVariant}
              />
            </AniFadeLink>
            <Typography variant="neutralLight" tag="label">
              {frontmatter.date}
            </Typography>
          </Flex>
        </Flex>
      </div>
    )
  }

  return (
    <MainLayout className="template-blog">
      <SEO title={frontmatter.title} description={frontmatter.desc} />
      <div className="template-blog-container">
        <Flex
          classes={["flexColumn", "justifyContentCenter"]}
          className="template-blog__header"
        >
          <AniFadeLink to="/blog">
            <Typography
              className="template-blog__go-back"
              variant="neutralLight"
            >
              ⤺ back to posts
            </Typography>
          </AniFadeLink>
          <Typography className="template-blog__title" tag="h1">
            {frontmatter.title}
          </Typography>
          <Flex
            className="template-blog__subheader-container"
            classes={["flexRow", "alignItemsCenter"]}
          >
            <Flex
              classes={["flexRow", "alignItemsCenter"]}
              className="template-blog__subheader__profile"
            >
              <Avatar
                fluid={frontmatter.avatar.childImageSharp.fluid}
                alt={frontmatter.author
                  .split(" ")
                  .map(x => x[0])
                  .join("")}
                className="template-blog__subheader__profile-avatar"
              />
              <Typography
                tag="label"
                className="template-blog__subheader__profile-author"
              >
                {frontmatter.author}
              </Typography>
            </Flex>
            <AniFadeLink
              className="template-blog__subheader__tag"
              to={`/blog/${frontmatter.subject}`}
            >
              <Tag
                label={frontmatter.subject}
                variant={blogTypeRef[frontmatter.subject].tagVariant}
              />
            </AniFadeLink>
          </Flex>
          <Flex
            className="template-blog__subheader-container"
            classes={["flexRow", "alignItemsCenter"]}
          >
            <Flex
              classes={["flexRow", "alignItemsCenter"]}
              className="template-blog__subheader__date-container"
            >
              <Icon
                svg="calendar"
                variant="neutralLight"
                className="template-blog__subheader__date-icon"
              />
              <Typography
                tag="span"
                variant="neutralLight"
                className="template-blog__subheader__date-text"
              >
                {frontmatter.date}
              </Typography>
            </Flex>
            <Flex
              classes={["flexRow", "alignItemsCenter"]}
              className="template-blog__subheader__view-counter-container"
            >
              <Icon
                svg="eye"
                variant="neutralLight"
                className="template-blog__subheader__view-counter-icon"
              />
              <Typography
                tag="span"
                variant="neutralLight"
                className="template-blog__subheader__view-counter-text"
              >
                {viewCount} views
              </Typography>
            </Flex>
          </Flex>
          <Img
            fluid={featuredImg.childImageSharp.fluid}
            alt={frontmatter.featuredImgAlt}
          />
        </Flex>
        {frontmatter.previous && (
          <Flex
            className="template-blog__previous-container"
            classes={["flexRow", "alignItemsCenter"]}
          >
            <Typography className="template-blog__previous-title" tag="h4">
              Previous article(s):
            </Typography>
            {frontmatter.previous.map((link, index) => (
              <Link
                key={`${link}-${index}`}
                to={`/blog/${frontmatter.subject}/${link}`}
              >
                <Typography
                  tag="h2"
                  className="template-blog__previous-link"
                  variant="positiveDark"
                >
                  {link}
                </Typography>
              </Link>
            ))}
          </Flex>
        )}
        <article
          className="template-blog__content-article"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {frontmatter.next && (
          <Link to={`/blog/${frontmatter.subject}/${frontmatter.next}`}>
            <Typography tag="h2" className="template-blog__next-link">
              {frontmatter.next}
            </Typography>
          </Link>
        )}
        <Divider className="template-blog__end-div" />
      </div>
      <Flex
        classes={["flexColumn", "alignItemsCenter"]}
        className="template-blog__related"
      >
        <Typography tag="h2">Related Articles...</Typography>
        <Flex
          classes={["flexRow", "flexWrap", "justifyContentCenter"]}
          className="template-blog__related__link-card-section"
        >
          <Flex classes={["flexColumn"]}>
            {data.allMarkdownRemark.edges.slice(0, 3).map(createColumn)}
          </Flex>
          <Flex classes={["flexColumn"]}>
            {data.allMarkdownRemark.edges.slice(3, 6).map(createColumn)}
          </Flex>
        </Flex>
      </Flex>
    </MainLayout>
  )
}

export { query, Blog as default }
