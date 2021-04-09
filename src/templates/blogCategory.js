import React from "react"
import { Link, graphql } from "gatsby"
import { useInView } from "react-intersection-observer"
import loadable from "@loadable/component"

import { RefMainLayout } from "@components/Layouts"
import { BlogCard, BlogPostSection, FilterSection } from "@pages/blog"

import "@styles/index.scss"
import "@styles/pages/_blogPage.scss"

import { blogTypeRef, tagIconRef } from "@utils/constants"
import { useInfiniteScroll } from "@utils/hooks"

const Flex = loadable(() => import("@components/Flex"))
const SEO = loadable(() => import("@components/SEO"))
const Chip = loadable(() => import("@components/Chip"))

const BlogCategory = ({ data, pageContext }) => {
  const [endRef, inView] = useInView({ threshold: 0 })

  const [mainRef, itemRange] = useInfiniteScroll(
    [0, 3],
    data.filteredRemarks.edges.totalCount
  )

  return (
    <RefMainLayout ref={mainRef} className="page-blog">
      <SEO title={`Blog (${pageContext.subject})`} />
      {!inView && (
        <FilterSection>
          <FilterChips
            postCount={data.metaRemarks.totalCount}
            categories={data.metaRemarks.group}
            matchingTag={pageContext.subject}
          />
        </FilterSection>
      )}
      <BlogPostSection>
        {data.filteredRemarks.edges.slice(...itemRange).map((post, index) => (
          <BlogCard key={`post-ref-${index}`} {...post.node} />
        ))}
      </BlogPostSection>

      <div style={{ position: "absolute", bottom: "-40px" }} ref={endRef} />
    </RefMainLayout>
  )
}

const FilterChips = ({ postCount, matchingTag, categories }) => (
  <Flex
    className="page-blog__aside__filter-tags-container"
    classes={["flexRow", "flexWrap"]}
  >
    <Link to={`/blog`} className="page-blog__aside__filter-tag">
      <Chip label={`all (${postCount})`} icon="refresh" variant="default" />
    </Link>
    {categories.map((ele, index) => {
      return (
        <Link
          key={`post-ref-${index}`}
          to={`/blog/${ele.tag}`}
          className="page-blog__aside__filter-tag"
        >
          <Chip
            label={`${ele.tag} (${ele.totalCount})`}
            key={`filter-chip-${index}`}
            icon={tagIconRef[ele.tag]}
            variant={
              matchingTag === ele.tag
                ? blogTypeRef[ele.tag].chipVariant
                : "default"
            }
          />
        </Link>
      )
    })}
  </Flex>
)

const query = graphql`
  query($subject: String!) {
    filteredRemarks: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $subject } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            desc
            date(formatString: "MMM D, YYYY")
            subject
            author
            tags
            featuredImgAlt
            avatar {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          featuredImg {
            childImageSharp {
              fluid(maxWidth: 500) {
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
    metaRemarks: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      totalCount
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`

export { query, BlogCategory as default }
