const path = require("path")

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == "MarkdownRemark") {
    const value = path.basename(node.fileAbsolutePath, ".md")

    createNodeField({ node, name: "slug", value })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogTemplate = path.resolve("./src/templates/blog.js")

  const response = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              subject
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  response.data.allMarkdownRemark.edges.forEach(edge => {
    const { fields, frontmatter } = edge.node

    createPage({
      component: blogTemplate,
      path: `/blog/${frontmatter.subject}/${fields.slug}`,
      context: { slug: fields.slug },
    })
  })
}
