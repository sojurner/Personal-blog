const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type == "MarkdownRemark") {
    // const slug = createFilePath({ node, getNode })
    // const value = path.basename(node.fileAbsolutePath, ".md")
    const [_, root, subject, slug] = createFilePath({ node, getNode }).split(
      "/"
    )

    createNodeField({ node, name: "slug", value: slug })
    createNodeField({ node, name: "subject", value: subject })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

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
              subject
            }
          }
        }
      }
    }
  `)

  response.data.allMarkdownRemark.edges.forEach(edge => {
    const { fields, frontmatter } = edge.node

    createPage({
      component: path.resolve("./src/templates/blogCategory.js"),
      path: `/blog/${frontmatter.subject}`,
      context: { subject: frontmatter.subject },
    })

    createPage({
      component: path.resolve("./src/templates/blog.js"),
      path: `/blog/${frontmatter.subject}/${fields.slug}`,
      context: { slug: fields.slug, subject: frontmatter.subject },
    })
  })
}
