import React, { useContext } from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useInView } from "react-intersection-observer"
import queryString from "query-string"
import loadable from "@loadable/component"

import MainLayout from "@components/Layouts"
import { AniLoaderLink } from "@components/Link"

import { blogTypeRef, tagIconRef } from "@utils/constants"
import { usePageViewMeta } from "@utils/hooks"
import "@styles/index.scss"
import "@styles/pages/_blogPage.scss"
import { useToggle } from "../utils/hooks"

const Img = loadable(() => import("gatsby-image"))
const Flex = loadable(() => import("@components/Flex"))
const Card = loadable(() => import("@components/Card"))
const Chip = loadable(() => import("@components/Chip"))
const Tag = loadable(() => import("@components/Tag"))
const Icon = loadable(() => import("@components/Icon"))
const VerticalSwitch = loadable(() => import("@components/Switch/VerticalSwitch"))
const Typography = loadable(() => import("@components/Typography"))
const Avatar = loadable(() => import("@components/Avatar"))
const SEO = loadable(() => import("@components/SEO"))

const sortParams = Object.freeze({
  views: "views",
  date: "date",
})

const BlogPage = ({ location }) => {
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
              time
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
  const params = React.useMemo(() => queryString.parse(location.search), [location.search])

  return (
    <MainLayout className="page-blog">
      <SEO title="Blog" />
      <SortProvider params={params}>
        <FilterSection>

          <Flex className="page-blog__aside__filter-container">
            <FilterTitle>Tags: </FilterTitle>
            <TagChips
              postCount={data.allMarkdownRemark.totalCount}
              categories={data.allMarkdownRemark.group}
              matchingTag={"all"}
            />
          </Flex>

          <Flex classes={['flexRow', "alignItemsCenter"]} className="page-blog__aside__filter-container">
            <FilterTitle>Sort: </FilterTitle>
            <SortOption />
            <Flex className="page-blog__aside__filter__order-switch">
              <SortOrderSwitch />
            </Flex>
          </Flex>
        </FilterSection>
        <BlogPostSection>
          {data.allMarkdownRemark.edges.map((post, index) => (
            <BlogCardMemo key={`post-ref-${index}`} {...post.node} />
          ))}
        </BlogPostSection>
      </SortProvider>
    </MainLayout>
  )
}

const SortContext = React.createContext()

const SortProvider = ({ params, ...props }) => {
  const [value, onToggle] = useToggle();

  return <SortContext.Provider value={{ isDesc: value, onToggle, ...params }} {...props}>
  </SortContext.Provider>
}

const SortOrderSwitch = () => {
  const { isDesc, onToggle } = useContext(SortContext)

  return (
    <VerticalSwitch onChange={onToggle} checked={isDesc} />
  )
}

const FilterSection = ({ children, ...props }) => {
  const [endRef, inView] = useInView({ threshold: 0 })

  return (
    <>
      <aside className="page-blog__aside" {...props}>{!inView && children}</aside>
      <div style={{ position: "absolute", bottom: "-40px" }} ref={endRef} />
    </>
  )
}

const FilterTitle = props => (
  <Typography
    className="page-blog__aside__filter-title"
    tag="h3"
    variant="neutralLight"
    {...props}
  ></Typography>
)

const TagChips = ({ postCount, categories }) => (
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

const SortOption = () => {
  const { sort } = useContext(SortContext)
  return (
    <Flex classes={["flexRow", 'alignItemsCenter']}>
      <Link
        to={`/blog?sort=views`}
        className="page-blog__aside__sort-tag"
      >
        <Chip icon="eye"
          label="views"
          variant={sort && sort === sortParams.views ? "neutral" : "default"}>
          views
          </Chip>
      </Link>
      <Link
        to={`/blog?sort=date`}
        className="page-blog__aside__sort-tag"
      >
        <Chip icon="calendar"
          label="date"
          variant={!sort || sort === sortParams.date ? "neutral" : "default"}>
          views
          </Chip>
      </Link>
    </Flex>
  )
}

const BlogContext = React.createContext()

const BlogPostSection = React.memo(props => {
  const [pageViews] = usePageViewMeta()
  const { sort, isDesc } = useContext(SortContext)
  let cloneProps = { ...props }

  if (!pageViews) return null

  if (sort) {

    cloneProps.children = cloneProps.children.sort((a, b) => {
      switch (sort) {
        case sortParams.views:
          return (pageViews[a.props.fields.slug].views -
            pageViews[b.props.fields.slug].views)

        case sortParams.date:
          return (new Date(b.props.frontmatter.date) -
            new Date(a.props.frontmatter.date))

        default:
          return a - b
      }
    })
  }

  return (
    <BlogContext.Provider value={[pageViews]}>
      <Flex
        className="page-blog__content-posts"
        classes={[!isDesc ? "flexColumn" : "flexColumnReverse", "alignItemsEnd"]}
        {...cloneProps}
      ></Flex>
    </BlogContext.Provider>
  )
})

const BlogAuthor = ({ children, fluid, alt, variant }) => (
  <Flex
    className="page-blog__card__left__profile-container"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Avatar
      fluid={fluid}
      alt={alt}
      className="page-blog__card__left__profile-avatar"
    />
    <Typography
      tag="label"
      className="page-blog__card__left__profile-author"
      variant={variant}
    >
      {children}
    </Typography>
  </Flex>
)

const BlogDescription = props => <Typography {...props} />

const BlogTitle = props => <Typography tag="h2" {...props} />

const BlogDate = ({ date, variant }) => (
  <Flex
    className="page-blog__card-content__details__date"
    classes={["flexColumn", "alignItemsCenter", "alignSelfCenter"]}
  >
    <Icon
      svg="calendar"
      className="page-blog__card-content__details-icon"
      variant={variant}
    />
    <Typography
      tag="span"
      className="page-blog__card-content__details-txt"
      variant={variant}
    >
      {date}
    </Typography>
  </Flex>
)

const BlogViewCount = ({ viewCount, variant }) => (
  <Flex
    className="page-blog__card-content__details__view-counter"
    classes={["flexColumn", "alignItemsCenter"]}
  >
    <Icon
      svg="eye"
      className="page-blog__card-content__details-icon"
      variant={variant}
    />
    <Typography
      tag="label"
      className="page-blog__card-content__details-txt"
      variant={variant}
    >
      {viewCount} views
    </Typography>
  </Flex>
)

const BlogReadMin = ({ min, variant }) => (
  <Flex
    className="page-blog__card-content__details__min-read"
    classes={["flexColumn", "alignItemsCenter"]}
  >
    <Icon
      svg="timer"
      className="page-blog__card-content__details-icon"
      variant={variant}
    />
    <Typography
      tag="label"
      className="page-blog__card-content__details-txt"
      variant={variant}
    >
      {min} min
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
        classes={["flexRow", "justifyContentStart"]}
        className="page-blog__card page-blog__card--loaded"
        depth={"z5"}
      >
        <Flex
          classes={["flexRow"]}
          className={`page-blog__card__left page-blog__card__left--${blogTypeRef[frontmatter.subject].cardVariant
            }`}
        >
          <Flex
            className="page-blog__card__left-inner"
            classes={["flexColumn", "justifyContentBetween"]}
          >
            <Flex
              classes={["flexRow", "flexWrap", "alignSelfCenter"]}
              className="page-blog__card__left__tags"
            >
              {frontmatter.tags.map((tag, index) => (
                <Tag
                  className="page-blog__card__left__tags-item"
                  label={tag}
                  key={`card-tag-${index}`}
                  variant={blogTypeRef[tag].tagVariant}
                />
              ))}
            </Flex>
            <BlogAuthor
              fluid={frontmatter.avatar.childImageSharp.fluid}
              variant={blogTypeRef[frontmatter.subject].textVariant}
              alt={frontmatter.author
                .split(" ")
                .map(x => x[0])
                .join("")}
            >
              {frontmatter.author}
            </BlogAuthor>
            <BlogDate
              date={frontmatter.date}
              variant={blogTypeRef[frontmatter.subject].textVariant}
            />
          </Flex>
          <Flex
            className="page-blog__card__left__txt-container"
            classes={["flexColumn"]}
          >
            <BlogTitle
              className="page-blog__card__left__txt-title"
              variant={blogTypeRef[frontmatter.subject].textVariant}
            >
              {frontmatter.title}
            </BlogTitle>
            <BlogDescription
              className="page-blog__card__left__txt-desc"
              variant={blogTypeRef[frontmatter.subject].textVariant}
            >
              {frontmatter.desc}
            </BlogDescription>
          </Flex>
        </Flex>

        <Flex
          classes={["flexColumn", "flexResizeAuto"]}
          className="page-blog__card__right"
        >
          <BlogTitle
            className="page-blog__card-content__txt-title"
            variant={"neutralLight"}
          >
            {frontmatter.title}
          </BlogTitle>
          <Flex
            className="page-blog__card__right__details"
            classes={["flexRow", "alignItemsCenter", "justifyContentCenter"]}
          >
            {pageViews && (
              <BlogViewCount
                variant={"neutralDark"}
                viewCount={
                  pageViews[fields.slug] ? pageViews[fields.slug].views : 0
                }
              />
            )}
            <Typography
              className="page-blog__card__right__dot"
              variant={"neutralDark"}
            >
              |
            </Typography>
            <BlogReadMin min={frontmatter.time} variant={"neutralDark"} />
          </Flex>
          {featuredImg && (
            <Img
              fluid={featuredImg.childImageSharp.fluid}
              durationFadeIn={200}
              className="page-blog__card__right__front-img"
              alt={frontmatter.featuredImgAlt}
            />
          )}
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
  BlogContext,
  BlogPostSection,
  TagChips,
  FilterSection,
  BlogPage as default,
}
