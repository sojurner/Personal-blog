import { graphql, useStaticQuery } from "gatsby"

const useDefaultQuery = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        edges {
          node {
            frontmatter {
              title
              desc
              date
              subject
              author
              tags
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
          }
        }
      }
    }
  `)
  return data
}
export { useDefaultQuery as default }
