import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

const detailsQuery = graphql`
  query SEO {
    site {
      siteMetadata {
        title
        description
        email
        url
        author
        phone
      }
    }
  }
`

const SEO = ({ description, keywords, author, title, url, email }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const metaTitle = data.site.siteMetadata.title
        const metaAuthor = author || data.site.siteMetadata.author
        const metaURL = url || data.site.siteMetadata.url
        const metaEmail = email || data.site.siteMetadata.email
        const metaKeywords = keywords || [
          "paul kim",
          "blog",
          "army",
          "code",
          "programming",
          "",
        ]

        return (
          <Helmet
            title={metaTitle}
            titleTemplate={`%s${title ? " - " + title : ""}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: metaTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:email`,
                content: metaEmail,
              },
              {
                property: `og.url`,
                content: metaURL,
              },
              {
                property: `og;type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: metaAuthor,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: description,
              },
            ].concat(
              metaKeywords && metaKeywords.length > 0
                ? {
                    name: `keywords`,
                    content: metaKeywords.join(", "),
                  }
                : []
            )}
          />
        )
      }}
    />
  )
}
export default SEO
