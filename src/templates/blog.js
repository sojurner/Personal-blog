import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import VSensor from "react-visibility-sensor"

import { AniLoaderLink, AniFadeLink } from "@components/Link"
import { TemplateLayout } from "@components/Layouts"
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

const Blog = ({ data }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const { frontmatter, fields, featuredImg, html } = data.markdownRemark
  const [viewCount] = usePageView(fields.slug)

  const onChange = visible => {
    if (isVisible !== visible) setIsVisible(visible)
  }

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
    <TemplateLayout inView={isVisible} className="template-blog">
      <Flex
        className="template-blog__landing-container"
        classes={["flexColumn", "justifyContentCenter", "alignItemsCenter"]}
      >
        <SEO title={frontmatter.title} description={frontmatter.desc} />
        <VSensor
          intervalDelay={500}
          partialVisibility={true}
          onChange={onChange}
          offset={{ bottom: -30 }}
        >
          <Img
            className="template-blog__feature-img"
            fluid={featuredImg.childImageSharp.fluid}
            alt={frontmatter.featuredImgAlt}
          />
        </VSensor>
        <div className="template-blog__shade-transition" />
        <AniFadeLink to="/blog">
          <Typography className="template-blog__go-back" variant="neutralDark">
            ⤺ back to posts
          </Typography>
        </AniFadeLink>
        <Flex
          classes={["flexRow", "alignItemsCenter"]}
          className="template-blog__author-profile"
        >
          <Typography
            tag="h3"
            className="template-blog__author-profile__author"
          >
            {frontmatter.author}
          </Typography>
          <Avatar
            fluid={frontmatter.avatar.childImageSharp.fluid}
            alt={frontmatter.author
              .split(" ")
              .map(x => x[0])
              .join("")}
            className="template-blog__author-profile__avatar"
          />
        </Flex>
        <Flex
          classes={["flexColumn", "justifyContentCenter"]}
          className="template-blog__header"
        >
          <Typography
            className="template-blog__title"
            variant="neutralDark"
            tag="h1"
          >
            {frontmatter.title}
          </Typography>
          <Flex
            className="template-blog__tag-divider"
            classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
          >
            <div className="template-blog__tag-divider__divider" />
            <AniFadeLink
              className="template-blog__tag-divider__tag"
              to={`/blog/${frontmatter.subject}`}
            >
              <Tag
                label={frontmatter.subject}
                variant={blogTypeRef[frontmatter.subject].tagVariant}
              />
            </AniFadeLink>
            <div className="template-blog__tag-divider__divider" />
          </Flex>
          <Flex
            className="template-blog__subheader-container"
            classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
          >
            <Flex
              classes={["flexRow", "alignItemsCenter"]}
              className="template-blog__subheader__date-container"
            >
              <Icon
                svg="calendar"
                variant="neutralDefault"
                className="template-blog__subheader__date-icon"
              />
              <Typography
                tag="span"
                variant="neutralDefault"
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
                variant="neutralDefault"
                className="template-blog__subheader__view-counter-icon"
              />
              <Typography
                tag="span"
                variant="neutralDefault"
                className="template-blog__subheader__view-counter-text"
              >
                {viewCount} views
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <div className="template-blog-container">
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
                  tag="h4"
                  className="template-blog__previous-link"
                  variant="neutralDark"
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
            <Typography tag="h3" className="template-blog__next-link">
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
    </TemplateLayout>
  )
}

const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "MMM D, YYYY")
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

export { query, Blog as default }
