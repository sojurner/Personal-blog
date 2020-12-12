import React from "react"
import { graphql, Link } from "gatsby"
import { AniLoaderLink, AniFadeLink } from "@components/Link"

import MainLayout from "@components/Layouts"
import Typography from "@components/Typography"
import Flex from "@components/Flex"
import Card from "@components/Card"
import Divider from "@components/Divider"
import Tag from "@components/Tag"
import Avatar from "@components/Avatar"

import "@styles/templates/_blogTemplate.scss"
import { blogTypeRef } from "../utils/constants"

const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        author
        subject
        next
        previous
        foregroundImg
        avatar {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
      html
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      filter: { fields: { slug: { ne: $slug } } }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            subject
            foregroundImg
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
  const { frontmatter, html } = data.markdownRemark

  return (
    <MainLayout className="template-blog">
      <div className="template-blog-container">
        <Flex
          classes={["flexColumn", "justifyContentCenter"]}
          className="template-blog__header"
          >
            <AniFadeLink to="/blog">
          <Typography className="template-blog__go-back" variant="neutralLight">⤺ back to posts</Typography>
          </AniFadeLink>
          <Typography className="template-blog__title" tag="h1">
            {frontmatter.title}
          </Typography>
          <Flex
            className="template-blog__profile-container"
            classes={["flexRow", "alignItemsCenter"]}
          >
            <Avatar
              fluid={frontmatter.avatar.childImageSharp.fluid}
              alt={frontmatter.author
                .split(" ")
                .map(x => x[0])
                .join("")}
              className="template-blog__profile-avatar"
            />
            <Flex
              className="template-blog__profile-txt-container"
              classes={["flexColumn", "justifyContentCenter"]}
            >
              <Typography
                tag="label"
                className="template-blog__profile-txt-author"
              >
                {frontmatter.author}
              </Typography>
              <Typography
                tag="span"
                variant="neutralLight"
                className="template-blog__profile-txt-date"
              >
                {frontmatter.date}
              </Typography>
            </Flex>
            <AniFadeLink
              className="template-blog__profile-tag"
              to={`/blog/${frontmatter.subject}`}
            >
              <Tag
                label={frontmatter.subject}
                variant={blogTypeRef[frontmatter.subject].tagVariant}
              />
            </AniFadeLink>
          </Flex>
          <img src={frontmatter.foregroundImg} alt="blog front img" />
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
          {data.allMarkdownRemark.edges.map(ele => {
            const { slug } = ele.node.fields
            const { title, date, subject, foregroundImg } = ele.node.frontmatter
            return (
              <Card
                className="template-blog__related__card"
                depth="z4"
                classes={["flexColumn"]}
              >
                <AniLoaderLink
                  to={`/blog/${subject}/${slug}`}
                  key={`related-${slug}`}
                >
                  <img src={foregroundImg} alt="related-front-img" />
                </AniLoaderLink>
                <Flex
                  classes={["flexColumn"]}
                  className="template-blog__related__card-text"
                >
                  <AniLoaderLink
                    to={`/blog/${subject}/${slug}`}
                    key={`related-${slug}`}
                  >
                    <Typography tag="h3">{title}</Typography>
                  </AniLoaderLink>
                  <Flex
                    classes={["flexRow", "alignItemsCenter"]}
                    className="template-blog__related__card__date-tag"
                  >
                    <AniFadeLink
                      to={`/blog/${subject}`}
                      key={`related-${slug}`}
                    >
                      <Tag
                        label={subject}
                        variant={blogTypeRef[subject].tagVariant}
                      />
                    </AniFadeLink>
                    <Typography variant="neutralLight" tag="label">
                      {date}
                    </Typography>
                  </Flex>
                </Flex>
              </Card>
            )
          })}
        </Flex>
      </Flex>
    </MainLayout>
  )
}

export { query, Blog as default }
