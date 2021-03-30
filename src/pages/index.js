import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useInView } from "react-intersection-observer"
import loadable from "@loadable/component"

import { AniLoaderLink } from "@components/Link"
import { SaxophoneCat, DrummerCat } from "@components/Svg"

import { blogTypeRef, musicLinks, skillsetIcons } from "../utils/constants"
import "@styles/index.scss"
import "@styles/pages/_homePage.scss"

const Img = loadable(() => import("gatsby-image"))
const Icon = loadable(() => import("@components/Icon"))
const Typography = loadable(() => import("@components/Typography"))
const MainLayout = loadable(() => import("@components/Layouts"))
const Flex = loadable(() => import("@components/Flex"))
const Tag = loadable(() => import("@components/Tag"))
const SEO = loadable(() => import("@components/SEO"))
const Button = loadable(() => import("@components/Button"))
const SoundCloudWidget = loadable(() => import("@components/SoundCloudWidget"))

const HomePage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          location
          phone
          email
        }
      }
      file(relativePath: { eq: "images/avatar-bitmap.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      allMarkdownRemark(
        limit: 6
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              desc
              subject
              date(formatString: "MMM DD, YYYY")
              tags
              featuredImgUrl
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
      allContentfulMeme(limit: 9, sort: { fields: [timestamp], order: DESC }) {
        nodes {
          title
          contentful_id
          img {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  `)

  const [welcomeRef, welcomeInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })
  const [aboutRef, aboutInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })
  const [musicRef, musicInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })
  const [blogRef, blogInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })

  return (
    <MainLayout className="page-home">
      <SEO title={data.site.siteMetadata.author} />
      <Flex
        className="page-home__landing-container"
        classes={["flexColumn", "justifyContentCenter"]}
      >
        <HomeLanding>
          <LandingImage
            fluid={data.file.childImageSharp.fluid}
            alt={data.site.siteMetadata.author
              .split(" ")
              .map(x => x[0])
              .join("")}
          />
          <LandingCurvedText />
          <LandingName />
        </HomeLanding>
      </Flex>
      <Flex className="page-home__about-section" classes={["flexColumn"]}>
        <span style={{marginTop: -30}} ref={welcomeRef} />
        {welcomeInView && (
          <Flex
            classes={["flexRow", "justifyContentCenter"]}
            className="page-home__about-section--inner"
          >
            <Flex className="page-home__about-section__img page-home__about-section__img-sax-cat">
              <SaxophoneCat />
            </Flex>
            <Flex
              className="page-home__about-section__txt"
              classes={["flexColumn"]}
            >
              <Typography variant="neutralDark" tag="h2">
                Welcome!
              </Typography>
              <div className="page-home__about-section__divider" />

              <Typography tag="h4" variant="neutralLight">
                I started this website as a <em>creative</em> and{" "}
                <em>therapeutic</em> outlet. I'll share all that I know, and all
                that I've wondered through my blog.
              </Typography>
              <HomeButtonLink
                to="/blog"
                variant="primary"
                className="page-home__about-section__link"
              >
                Go to blog
              </HomeButtonLink>
            </Flex>
          </Flex>
        )}

        <span style={{marginTop: -30}} ref={aboutRef} />
        {aboutInView && (
          <Flex
            classes={["flexRow", "justifyContentCenter"]}
            className="page-home__about-section--inner"
          >
            <Flex
              className="page-home__about-section__txt"
              classes={["flexColumn"]}
            >
              <Typography variant="neutralDark" tag="h2">
                About
              </Typography>
              <div className="page-home__about-section__divider" />

              <Typography tag="h4" variant="neutralLight">
                As a <em>full-stack developer</em>, here's a broad overview of
                my
                <em> skillset</em>:
              </Typography>
              <div className="page-home__about-section__skill-icons">
                {skillsetIcons.map(skillProps => (
                  <HomeSKillIcon
                    key={`skill-icon-${skillProps.svg}`}
                    {...skillProps}
                  />
                ))}
              </div>
              <HomeButtonLink
                to="/about"
                variant="secondary"
                className="page-home__about-section__link"
              >
                More about me
              </HomeButtonLink>
            </Flex>
            <Flex className="page-home__about-section__img page-home__about-section__img-drummer-cat">
              <DrummerCat />
            </Flex>
          </Flex>
        )}
      </Flex>

      <span style={{marginTop: -30}} ref={musicRef} />

      {musicInView && (
        <Flex
          className="page-home__music-section extended-section"
          classes={["flexColumn"]}
        >
          <Typography
            className="music-title extended-title"
            tag="h1"
            variant="neutralDark"
          >
            Music
          </Typography>
          <HomeSCEmbed />
        </Flex>
      )}

      <span style={{marginTop: -30}} ref={blogRef} />

      {blogInView && (
        <Flex
          classes={["flexColumn"]}
          className="extended-section page-home__blog-section"
        >
          <Typography className="extended-title" tag="h1" variant="neutralDark">
            Latest Blogs
          </Typography>

          <Flex
            className="page-home__blog-section__cards-container"
            classes={["flexRow", "justifyContentAround", "flexWrap"]}
          >
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const { frontmatter, fields, featuredImg } = node
              return (
                <HomeBlogCard
                  key={`latest-posts-${frontmatter.title}`}
                  variant={blogTypeRef[frontmatter.subject].tagVariant}
                  to={`blog/${frontmatter.subject}/${fields.slug}`}
                  className={`page-home__blog-section__card--${
                    blogTypeRef[frontmatter.subject].tagVariant
                  } page-home__blog-section__card`}
                >
                  <Img
                    alt="blog front img"
                    className={`page-home__blog-section__card__img`}
                    fluid={featuredImg.childImageSharp.fluid}
                    src={frontmatter.featuredImgUrl}
                  />
                  <HomeBlogCardContent frontmatter={frontmatter} />
                </HomeBlogCard>
              )
            })}
          </Flex>
          <HomeButtonLink
            to="/blog"
            className="page-home__blog-section__link-blog"
            variant="default"
          >
            More Posts
          </HomeButtonLink>
        </Flex>
      )}
    </MainLayout>
  )
}

const LandingImage = props => (
  <Img className="page-home__landing-header__front-img" {...props} />
)

const LandingName = () => (
  <Flex
    classes={["flexColumn"]}
    className="page-home__landing-header__txt-name"
  >
    <Typography
      className="page-home__landing-header__txt-firstname"
      tag="h1"
      variant="primaryDark"
    >
      PAUL
    </Typography>
    <Typography
      className="page-home__landing-header__txt-lastname"
      tag="h1"
      variant="secondaryDark"
    >
      KIM
    </Typography>
  </Flex>
)

const LandingCurvedText = () => (
  <svg className="page-home__landing-header__curved-svg" viewBox="0 0 500 500">
    <path
      id="curve"
      d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97"
    />
    <text width="500">
      <textPath xlinkHref="#curve">Software Developer</textPath>
    </text>
  </svg>
)

const HomeLanding = ({ children }) => (
  <Flex
    classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
    className="page-home__landing-header"
  >
    <Flex
      classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
      className="page-home__landing-header__txt"
    >
      {children}
    </Flex>
  </Flex>
)

const HomeSCEmbed = () => {
  const [targetUrl, setTargetUrl] = React.useState(musicLinks[0].scURL)

  const handleCategoryClick = url => {
    if (url === targetUrl) return
    setTargetUrl(url)
  }

  if (!targetUrl) return null

  return (
    <div className="music">
      {musicLinks.map(link => (
        <Flex
          classes={["flexRow", "alignItemsCenter"]}
          key={`music-${link.title}`}
          className={`music-category music-category--${link.name} ${
            targetUrl === link.scURL ? "music-category--active" : ""
          }`}
          onClick={handleCategoryClick.bind(null, link.scURL)}
        >
          <Typography tag="h5" variant="currentColor">
            {link.title}
          </Typography>
        </Flex>
      ))}
      <SoundCloudWidget url={targetUrl} />
    </div>
  )
}

const HomeBlogCard = ({ to, className, children }) => (
  <AniLoaderLink to={to}>
    <Flex classes={["flexColumn"]} className={className}>
      {children}
    </Flex>
  </AniLoaderLink>
)

const HomeBlogCardContent = ({ frontmatter }) => (
  <>
    <Typography variant="neutralDark" tag="h3">
      {frontmatter.title}
    </Typography>
    <Flex
      className="page-home__blog-section__card__date-tag"
      classes={["flexRow", "alignItemsCenter"]}
    >
      <Typography tag="label" variant="neutralLight">
        {frontmatter.date}
      </Typography>
      <Tag
        className="page-home__blog-section__card__tag"
        label={frontmatter.subject}
        variant={blogTypeRef[frontmatter.subject].tagVariant}
      />
    </Flex>
    <Typography>{frontmatter.desc}</Typography>
  </>
)

const HomeSKillIcon = props => (
  <div>
    <Icon {...props} />
  </div>
)

const HomeButtonLink = ({ to, children, className, variant }) => (
  <AniLoaderLink to={to} className={`${className} to-section-btn-link"`}>
    <Button variant={variant}>{children}</Button>
  </AniLoaderLink>
)

export default HomePage
