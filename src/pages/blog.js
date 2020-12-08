import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { useInView } from "react-intersection-observer"
import ContentLoader from "react-content-loader"

import { RefMainLayout } from "@components/Layouts"
import Flex from "@components/Flex"
import Card from "@components/Card"
import Chip from "@components/Chip"
import Tag from "@components/Tag"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import Avatar from "@components/Avatar"
import Divider from "@components/Divider"

import { OldManAndTheSea } from "@components/Svg"

import "@styles/index.scss"
import "@styles/pages/_blogPage.scss"

const blogTypeRef = {
  military: {
    textVariant: "negativeDark",
    chipVariant: "negative",
    tagVariant: "negative",
  },
  storytelling: {
    textVariant: "secondaryDark",
    chipVariant: "secondary",
    tagVariant: "secondary",
  },
  social: {
    textVariant: "primaryDark",
    chipVariant: "primary",
    tagVariant: "primary",
  },
  code: {
    textVariant: "primaryDark",
    chipVariant: "primary",
    tagVariant: "primary",
  },
}

const tagIconRef = {
  military: "military",
  social: "social",
  storytelling: "book",
  code: "codetags",
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const BlogPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [tagFilter, setTagFilter] = React.useState("all")
  const [yearFilter, setYearFilter] = React.useState("all")
  const [monthFilter, setMonthFilter] = React.useState("all")
  const mainRef = React.useRef()
  const [endRef, inView] = useInView({
    threshold: 0,
  })

  React.useEffect(() => {
    toggleLoading()
  }, [])

  const toggleLoading = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const handleTagFilterSet = val => {
    if (tagFilter === val) return
    toggleLoading()
    setTagFilter(val)
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  const handleYearFilterSet = val => {
    if (yearFilter === val) return
    toggleLoading()
    setYearFilter(val)
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  const handleMonthFilterSet = val => {
    if (monthFilter === val) return
    toggleLoading()
    setMonthFilter(val)
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
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

  const filteredPosts = data.allMarkdownRemark.edges.filter(post => {
    var date = new Date(post.node.frontmatter.date)
    return (
      (tagFilter === "all" || post.node.frontmatter.tags.includes(tagFilter)) &&
      (yearFilter === "all" || date.getFullYear() === yearFilter) &&
      (monthFilter === "all" || date.getMonth() === monthFilter)
    )
  })

  return (
    <RefMainLayout ref={mainRef} className="page-blog">
      {!inView && (
        <aside className="page-blog__aside">
          <Flex className="page-blog__aside__filter-container">
            <Typography
              className="page-blog__aside__filter-title"
              tag="h3"
              variant="neutralLight"
            >
              Tags:{" "}
            </Typography>
            <Flex
              className="page-blog__aside__filter-tags-container"
              classes={["flexRow", "flexWrap"]}
            >
              <Chip
                label="all"
                icon="refresh"
                className="page-blog__aside__filter-tag"
                variant={tagFilter === "all" ? "neutral" : "default"}
                onClick={handleTagFilterSet.bind(null, "all")}
              />
              {[
                ...new Set(
                  data.allMarkdownRemark.edges
                    .map(edge => edge.node.frontmatter.tags)
                    .flat()
                ),
              ].map((tag, index) => {
                return (
                  <Chip
                    label={tag}
                    className="page-blog__aside__filter-tag"
                    key={`filter-chip-${index}`}
                    onClick={handleTagFilterSet.bind(null, tag)}
                    icon={tagIconRef[tag]}
                    variant={
                      tagFilter === tag
                        ? blogTypeRef[tag].chipVariant
                        : "default"
                    }
                  />
                )
              })}
            </Flex>
          </Flex>
          <Flex className="page-blog__aside__filter-container">
            <Typography
              className="page-blog__aside__filter-title"
              tag="h3"
              variant="neutralLight"
            >
              Year:
            </Typography>
            <Flex
              className="page-blog__aside__filter-tags-container"
              classes={["flexRow", "flexWrap"]}
            >
              <Chip
                label="all"
                icon="refresh"
                className="page-blog__aside__filter-tag"
                variant={yearFilter === "all" ? "neutral" : "default"}
                onClick={handleYearFilterSet.bind(null, "all")}
              />
              {[
                ...new Set(
                  data.allMarkdownRemark.edges
                    .map(edge =>
                      new Date(edge.node.frontmatter.date).getFullYear()
                    )
                    .flat()
                ),
              ].map(year => {
                return (
                  <Chip
                    label={year}
                    className="page-blog__aside__filter-tag"
                    key={`filter-chip-${year}`}
                    onClick={handleYearFilterSet.bind(null, year)}
                    variant={yearFilter === year ? "neutral" : "default"}
                  />
                )
              })}
            </Flex>
          </Flex>
          <Flex className="page-blog__aside__filter-container">
            <Typography
              className="page-blog__aside__filter-title"
              tag="h3"
              variant="neutralLight"
            >
              Month:
            </Typography>
            <Flex
              className="page-blog__aside__filter-tags-container"
              classes={["flexRow", "flexWrap"]}
            >
              <Chip
                label="all"
                icon="refresh"
                className="page-blog__aside__filter-tag"
                variant={monthFilter === "all" ? "neutral" : "default"}
                onClick={handleMonthFilterSet.bind(null, "all")}
              />
              {console.log(monthFilter)}
              {[
                ...new Set(
                  data.allMarkdownRemark.edges
                    .map(edge =>
                      new Date(edge.node.frontmatter.date).getMonth()
                    )
                    .flat()
                ),
              ].map(month => {
                return (
                  <Chip
                    label={monthNames[month]}
                    className="page-blog__aside__filter-tag"
                    key={`filter-chip-${month}`}
                    onClick={handleMonthFilterSet.bind(null, month)}
                    variant={monthFilter === month ? "neutral" : "default"}
                  />
                )
              })}
            </Flex>
          </Flex>
        </aside>
      )}

      <Flex
        className="page-blog__content-posts"
        classes={["flexColumn", "alignItemsEnd"]}
      >
        {!loading ? (
          filteredPosts.length ? (
            filteredPosts.map((post, index) => {
              const { fields, frontmatter } = post.node
              return (
                <Link
                  key={`post-ref-${index}`}
                  to={`/blog/${frontmatter.subject}/${fields.slug}`}
                  className="page-blog__card-link"
                >
                  <Card
                    classes={["flexColumn", "justifyContentCenter"]}
                    className="page-blog__card"
                    depth={"z5"}
                    variant={"default"}
                  >
                    <img
                      className="page-blog__card-header__foreground-img"
                      src={frontmatter.foregroundImg}
                    />

                    <Flex
                      className="page-blog__card-header__profile-container"
                      classes={["flexRow", "alignItemsCenter"]}
                    >
                      <Avatar
                        fluid={frontmatter.avatar.childImageSharp.fluid}
                        alt={frontmatter.author
                          .split(" ")
                          .map(x => x[0])
                          .join("")}
                        className="page-blog__card-header__profile-avatar"
                      />
                      <Typography
                        tag="label"
                        className="page-blog__card-header__profile-author"
                      >
                        {frontmatter.author}
                      </Typography>
                    </Flex>
                    <Flex
                      classes={["flexColumn"]}
                      className="page-blog__card-content"
                    >
                      <Typography
                        className="page-blog__card-content__txt-title"
                        tag="h2"
                        variant={blogTypeRef[frontmatter.subject].textVariant}
                      >
                        {frontmatter.title}
                      </Typography>
                      <Flex className="page-blog__card-content__details">
                        <Flex classes={["flexRow", "alignItemsCenter"]}>
                          <Icon
                            svg="calendar"
                            className="page-blog__card-content__details-calendar-icon"
                            variant="neutralLight"
                          />
                          <Typography
                            tag="span"
                            className="page-blog__card-content__details-date"
                            variant="neutralLight"
                          >
                            {frontmatter.date}
                          </Typography>
                        </Flex>
                      </Flex>

                      <Typography
                        className="page-blog__card-content__txt-desc"
                        variant={blogTypeRef[frontmatter.subject].textVariant}
                      >
                        {frontmatter.desc}
                      </Typography>
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
                </Link>
              )
            })
          ) : (
            <>
              <OldManAndTheSea className="page-blog__no-results-img" />
              <Typography
                variant="neutralLight"
                className="page-blog__no-results-label"
                tag="h1"
              >
                No Matching Posts!
              </Typography>
            </>
          )
        ) : (
          <>
            {[...Array(2).keys()].map((_, index) => (
              <ContentLoader
                key={`loader-${index}`}
                height={450}
                speed={1}
                backgroundColor={"#f5f6f7"}
                foregroundColor={"#eee"}
                viewBox="0 0 250 200"
                className="page-blog__loader"
              >
                <rect x="0" y="0" rx="5" ry="5" width="250" height="100" />
                <rect x="40" y="108" rx="4" ry="4" width="210" height="15" />
                <rect x="40" y="127" rx="4" ry="4" width="50" height="7" />
                <circle cx="20" cy="120" r="13" />
                <rect x="0" y="140" rx="4" ry="4" width="250" height="10" />
                <rect x="0" y="155" rx="3" ry="3" width="250" height="10" />
              </ContentLoader>
            ))}
          </>
        )}
      </Flex>
      <div ref={endRef} />
    </RefMainLayout>
  )
}

export default BlogPage
