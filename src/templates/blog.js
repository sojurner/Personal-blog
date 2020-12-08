import React from "react"
import { graphql, Link } from "gatsby"

import MainLayout from "@components/Layouts"
import Typography from "@components/Typography"
import Flex from "@components/Flex"
import Avatar from "@components/Avatar"

import "@styles/templates/_blogTemplate.scss"

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
      html
    }
  }
`

const Blog = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark

  return (
    <MainLayout className="template-blog">
      <div className="template-blog-container">
        <Typography className="template-blog__title" tag="h1">
          {frontmatter.title}
        </Typography>
        <Flex className="template-blog__profile-container">
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
        </Flex>
        <img src={frontmatter.foregroundImg} />
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
        ></article>
        {frontmatter.next && (
          <Link to={`/blog/${frontmatter.subject}/${frontmatter.next}`}>
            <Typography
              tag="h2"
              className="template-blog__next-link"
              variant="positiveDark"
            >
              {frontmatter.next}
            </Typography>
          </Link>
        )}
      </div>
    </MainLayout>
  )
}

export { query, Blog as default }
