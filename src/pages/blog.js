import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useInView } from "react-intersection-observer"
import loadable from "@loadable/component"

import MainLayout from "@components/Layouts"
import { AniLoaderLink } from "@components/Link"

import { blogTypeRef, tagIconRef } from "@utils/constants"
import { usePageViewMeta } from "@utils/hooks"
import "@styles/index.scss"
import "@styles/pages/_blogPage.scss"

const Img = loadable(() => import("gatsby-image"))
const Flex = loadable(() => import("@components/Flex"))
const Card = loadable(() => import("@components/Card"))
const Chip = loadable(() => import("@components/Chip"))
const Tag = loadable(() => import("@components/Tag"))
const Icon = loadable(() => import("@components/Icon"))
const Typography = loadable(() => import("@components/Typography"))
const Avatar = loadable(() => import("@components/Avatar"))
const SEO = loadable(() => import("@components/SEO"))

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        totalCount
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
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <MainLayout className="page-blog">
      <SEO title="Blog" />
      <FilterSection>
        <FilterChips
          postCount={data.allMarkdownRemark.totalCount}
          categories={data.allMarkdownRemark.group}
          matchingTag={"all"}
        />
      </FilterSection>
      <BlogPostSection>
        {data.allMarkdownRemark.edges.map((post, index) => (
          <BlogCardMemo key={`post-ref-${index}`} {...post.node} />
        ))}
      </BlogPostSection>
    </MainLayout>
  )
}

const FilterSection = ({ children }) => {
  const [endRef, inView] = useInView({ threshold: 0 })

  return (
    <>
      <aside className="page-blog__aside">
        {!inView && (
          <Flex className="page-blog__aside__filter-container">
            <Typography
              className="page-blog__aside__filter-title"
              tag="h3"
              variant="neutralLight"
            >
              Tags:{" "}
            </Typography>
            {children}
          </Flex>
        )}
      </aside>
      <div style={{ position: "absolute", bottom: "-40px" }} ref={endRef} />
    </>
  )
}

const FilterChips = ({ postCount, categories }) => (
  <Flex
    className="page-blog__aside__filter-tags-container"
    classes={["flexRow", "flexWrap"]}
  >
    <Link to={`/blog`} className="page-blog__aside__filter-tag">
      <Chip label={`all (${postCount})`} icon="refresh" variant="neutral" />
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
            variant="default"
          />
        </Link>
      )
    })}
  </Flex>
)

const BlogContext = React.createContext()

const BlogPostSection = React.memo(props => {
  const [pageViews] = usePageViewMeta()

  return (
    <BlogContext.Provider value={[pageViews]}>
      <Flex
        className="page-blog__content-posts"
        classes={["flexColumn", "alignItemsEnd"]}
        {...props}
      ></Flex>
    </BlogContext.Provider>
  )
})

const BlogAuthor = ({ children, fluid, alt }) => (
  <Flex
    className="page-blog__card-header__profile-container"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Avatar
      fluid={fluid}
      alt={alt}
      className="page-blog__card-header__profile-avatar"
    />
    <Typography tag="label" className="page-blog__card-header__profile-author">
      {children}
    </Typography>
  </Flex>
)

const BlogDescription = props => (
  <Typography className="page-blog__card-content__txt-desc" {...props} />
)

const BlogTitle = props => (
  <Typography
    className="page-blog__card-content__txt-title"
    tag="h2"
    {...props}
  />
)

const BlogDate = ({ date }) => (
  <Flex
    className="page-blog__card-content__details__date"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Icon
      svg="calendar"
      className="page-blog__card-content__details-icon"
      variant="neutralLight"
    />
    <Typography
      tag="span"
      className="page-blog__card-content__details-txt"
      variant="neutralLight"
    >
      {date}
    </Typography>
  </Flex>
)

const BlogViewCount = ({ viewCount }) => (
  <Flex
    className="page-blog__card-content__details__view-counter page-blog__card-content__details-inner"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Icon
      svg="eye"
      className="page-blog__card-content__details-icon"
      variant="neutralLight"
    />
    <Typography
      tag="span"
      className="page-blog__card-content__details-txt"
      variant="neutralLight"
    >
      {viewCount} views
    </Typography>
  </Flex>
)

const BlogCard = ({ frontmatter, featuredImg, fields }) => {
  const [pageViews] = React.useContext(BlogContext)
  return (
    <AniLoaderLink
      to={`/blog/${frontmatter.subject}/${fields.slug}`}
      className="page-blog__card-link"
    >
      <Card
        classes={["flexColumn", "justifyContentCenter"]}
        className="page-blog__card page-blog__card--loaded"
        depth={"z5"}
        variant={"default"}
      >
        {featuredImg && (
          <Img
            fluid={featuredImg.childImageSharp.fluid}
            durationFadeIn={200}
            className="page-blog__card-header__foreground-img"
            alt={frontmatter.featuredImgAlt}
          />
        )}
        <Flex
          classes={["flexRow", "justifyContentBetween"]}
          className="page-blog__card-header__author-tags"
        >
          <BlogAuthor
            fluid={frontmatter.avatar.childImageSharp.fluid}
            alt={frontmatter.author
              .split(" ")
              .map(x => x[0])
              .join("")}
          >
            {frontmatter.author}
          </BlogAuthor>
          <Flex
            classes={["flexRow", "flexWrap", "alignSelfBaseline"]}
            className="page-blog__card-header__tags"
          >
            {frontmatter.tags.map((tag, index) => (
              <Tag
                className="page-blog__card-header__tags__item"
                label={tag}
                key={`card-tag-${index}`}
                variant={blogTypeRef[tag].tagVariant}
              />
            ))}
          </Flex>
        </Flex>
        <Flex classes={["flexColumn"]} className="page-blog__card-content">
          <BlogTitle variant={blogTypeRef[frontmatter.subject].textVariant}>
            {frontmatter.title}
          </BlogTitle>

          <Flex className="page-blog__card-content__details">
            <BlogDate date={frontmatter.date} />
            {pageViews && (
              <BlogViewCount
                viewCount={
                  pageViews[fields.slug] ? pageViews[fields.slug].views : 0
                }
              />
            )}
          </Flex>
          <BlogDescription
            variant={blogTypeRef[frontmatter.subject].textVariant}
          >
            {frontmatter.desc}
          </BlogDescription>
        </Flex>
      </Card>
    </AniLoaderLink>
  )
}

const BlogCardMemo = React.memo(
  BlogCard,
  (prev, next) => prev.fields.slug === next.fields.slug
)

export {
  BlogCard,
  BlogViewCount,
  BlogDate,
  BlogTitle,
  BlogDescription,
  BlogAuthor,
  BlogPostSection,
  FilterChips,
  FilterSection,
  BlogPage as default,
}
