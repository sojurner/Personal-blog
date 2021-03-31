import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useInView } from "react-intersection-observer"
import loadable from "@loadable/component"

import { RefMainLayout } from "@components/Layouts"
import { AniLoaderLink } from "@components/Link"

import { blogTypeRef, tagIconRef } from "@utils/constants"
import { usePageViewMeta, useInfiniteScroll } from "@utils/hooks"
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
const Divider = loadable(() => import("@components/Divider"))

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

  const [pageViews] = usePageViewMeta()

  const [endRef, inView] = useInView({ threshold: 0 })

  const [mainRef, itemRange] = useInfiniteScroll(
    [0, 3],
    data.allMarkdownRemark.edges.totalCount
  )

  return (
    <RefMainLayout ref={mainRef} className="page-blog">
      <SEO title="Blog" />
      {!inView && (
        <FilterSection>
          <FilterChips
            postCount={data.allMarkdownRemark.totalCount}
            categories={data.allMarkdownRemark.group}
            matchingTag={"all"}
          />
        </FilterSection>
      )}

      <BlogPostSection>
        {data.allMarkdownRemark.edges.slice(...itemRange).map((post, index) => (
          <BlogCard
            key={`post-ref-${index}`}
            viewCount={
              pageViews && pageViews[post.node.fields.slug]
                ? pageViews[post.node.fields.slug].views
                : 0
            }
            {...post.node}
          />
        ))}
      </BlogPostSection>

      <div style={{ position: "absolute", bottom: "-40px" }} ref={endRef} />
    </RefMainLayout>
  )
}

const FilterSection = ({ children }) => (
  <aside className="page-blog__aside">
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
  </aside>
)

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

const BlogPostSection = props => (
  <Flex
    className="page-blog__content-posts"
    classes={["flexColumn", "alignItemsEnd"]}
    {...props}
  ></Flex>
)

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

const BlogCard = ({ frontmatter, featuredImg, fields, viewCount }) => (
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
          className="page-blog__card-header__foreground-img"
          alt={frontmatter.featuredImgAlt}
        />
      )}

      <BlogAuthor
        fluid={frontmatter.avatar.childImageSharp.fluid}
        alt={frontmatter.author
          .split(" ")
          .map(x => x[0])
          .join("")}
      >
        {frontmatter.author}
      </BlogAuthor>
      <Flex classes={["flexColumn"]} className="page-blog__card-content">
        <BlogTitle variant={blogTypeRef[frontmatter.subject].textVariant}>
          {frontmatter.title}
        </BlogTitle>

        <Flex className="page-blog__card-content__details">
          <BlogDate date={frontmatter.date} />
          <BlogViewCount viewCount={viewCount} />
        </Flex>
        <BlogDescription variant={blogTypeRef[frontmatter.subject].textVariant}>
          {frontmatter.desc}
        </BlogDescription>

        <Divider className="page-blog__card-content__divider" />
        <Flex
          classes={["flexRow", "flexWrap", "alignSelfBaseline"]}
          className="page-blog__card-footer-tags"
        >
          {frontmatter.tags.map((tag, index) => (
            <Tag
              label={tag}
              key={`card-tag-${index}`}
              variant={blogTypeRef[tag].tagVariant}
            />
          ))}
        </Flex>
      </Flex>
    </Card>
  </AniLoaderLink>
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
