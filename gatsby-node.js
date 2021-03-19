const path = require("path")
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`)

module.exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
    }
    type Frontmatter {
      title: String!
      featuredImgUrl: String
      featuredImgAlt: String
    }
  `)
}

module.exports.onCreateNode = async ({
  node,
  getNode,
  actions: { createNode, createNodeField },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type == "MarkdownRemark") {
    if (node.frontmatter.featuredImgUrl !== null) {
      let fileNode = await createRemoteFileNode({
        url: node.frontmatter.featuredImgUrl, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's Redux store
      })
      // if the file was created, attach the new node to the parent node
      if (fileNode) {
        node.featuredImg___NODE = fileNode.id
      }
    }

    const [_, __, subject, slug] = createFilePath({ node, getNode }).split("/")

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
      tagsGroup: allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(jpeg|jpg|gif|png)/" }
          relativePath: { regex: "/memes/" }
        }
      ) {
        edges {
          node {
            name
          }
        }
      }
    }
  `)

  const { edges: posts } = response.data.allMarkdownRemark
  const { group: tags } = response.data.tagsGroup
  const { edges: memes } = response.data.allFile

  posts.forEach(edge => {
    const { fields, frontmatter } = edge.node
    createPage({
      component: path.resolve("./src/templates/blog.js"),
      path: `/blog/${frontmatter.subject}/${fields.slug}`,
      context: { slug: fields.slug, subject: frontmatter.subject },
    })
  })

  tags.forEach(tag => {
    createPage({
      component: path.resolve("./src/templates/blogCategory.js"),
      path: `/blog/${tag.fieldValue}`,
      context: { subject: tag.fieldValue },
    })
  })

  memes.forEach(kek => {
    const { name } = kek.node
    createPage({
      component: path.resolve("./src/templates/meme.js"),
      path: `/meme/${name}`,
      context: { name },
    })
  })
}
