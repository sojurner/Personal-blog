import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { useInView } from "react-intersection-observer"
import ContentLoader from "react-content-loader"
import VSensor from "react-visibility-sensor"

import { RefMainLayout } from "@components/Layouts"
import { AniLoaderLink } from "@components/Link"
import Flex from "@components/Flex"
import Card from "@components/Card"
import Chip from "@components/Chip"
import Tag from "@components/Tag"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import Avatar from "@components/Avatar"
import Divider from "@components/Divider"
import SEO from "@components/SEO"

import { blogTypeRef, tagIconRef } from "../utils/constants"
import { usePageViewMeta } from "../hooks"
import "@styles/index.scss"
import "@styles/pages/_blogPage.scss"

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

  const [visibleState, setVisibleState] = React.useState(
    data.allMarkdownRemark.edges.reduce((result, { node: { fields } }) => {
      result[fields.slug] = false
      return result
    }, {})
  )
  const [loading, setLoading] = React.useState(true)
  const [pageViews] = usePageViewMeta()

  const mainRef = React.useRef()
  const [endRef, inView] = useInView({ threshold: 0 })

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  function onChange(isVisible, slug) {
    if (visibleState[slug]) return
    setVisibleState(state => ({ ...state, [slug]: isVisible }))
  }

  return (
    <RefMainLayout ref={mainRef} className="page-blog">
      <SEO title="Blog" />
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
              <Link to={`/blog`} className="page-blog__aside__filter-tag">
                <Chip
                  label={`all (${data.allMarkdownRemark.totalCount})`}
                  icon="refresh"
                  variant="neutral"
                />
              </Link>
              {data.allMarkdownRemark.group.map((ele, index) => {
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
          </Flex>
        </aside>
      )}

      <Flex
        className="page-blog__content-posts"
        classes={["flexColumn", "alignItemsEnd"]}
      >
        {!loading ? (
          data.allMarkdownRemark.edges.map((post, index) => {
            const { fields, frontmatter, featuredImg } = post.node
            return (
              <VSensor
                key={`post-ref-${index}`}
                delayedCall={true}
                scrollDelay={500}
                onChange={isVisible => onChange(isVisible, fields.slug)}
                partialVisibility={true}
              >
                <AniLoaderLink
                  key={`post-ref-${index}`}
                  to={`/blog/${frontmatter.subject}/${fields.slug}`}
                  className="page-blog__card-link"
                >
                  <Card
                    classes={["flexColumn", "justifyContentCenter"]}
                    className={
                      visibleState[fields.slug]
                        ? "page-blog__card page-blog__card--loaded"
                        : "page-blog__card page-blog__card--hidden"
                    }
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
                            {frontmatter.date}
                          </Typography>
                        </Flex>
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
                            {pageViews && pageViews[fields.slug]
                              ? pageViews[fields.slug].views
                              : 0}{" "}
                            views
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
                </AniLoaderLink>
              </VSensor>
            )
          })
        ) : (
          <>
            {[...Array(2).keys()].map((_, index) => (
              <ContentLoader
                key={`loader-${index}`}
                height={450}
                speed={1}
                backgroundColor={"var(--pk-color-skeleton-bg)"}
                foregroundColor={"var(--pk-color-skeleton-fg)"}
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
