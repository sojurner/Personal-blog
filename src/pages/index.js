import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import ReactTooltip from "react-tooltip"
import { useMediaQuery } from "react-responsive"
import Carousel from "react-alice-carousel"

import { AniLoaderLink } from "@components/Link"
import { SaxophoneCat, DrummerCat } from "@components/Svg"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import MainLayout from "@components/Layouts"
import Flex from "@components/Flex"
import Tag from "@components/Tag"
import SEO from "@components/SEO"
import Button from "@components/Button"
import SoundCloudWidget from "@components/SoundCloudWidget"

import { blogTypeRef, musicLinks, skillsetIcons } from "../utils/constants"
import "@styles/index.scss"
import "@styles/pages/_homePage.scss"

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
              As a <em>full-stack developer</em>, here's a broad overview of my
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
      </Flex>
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

      <Flex
        className="extended-section page-home__memes-section"
        classes={["flexColumn", "alignItemsCenter"]}
      >
        <Typography
          className="memes-title extended-title"
          tag="h1"
          variant="neutralDark"
        >
          Latest Memes
        </Typography>
        <Flex className="memes-carousel">
          <Carousel
            className="memes-carousel"
            responsive={{
              0: { items: 2 },
              568: { items: 2 },
              1024: { items: 3 },
            }}
            items={data.allContentfulMeme.nodes.map((node, index) => (
              <HomeCarouselSlide
                key={`${node.contentful_id}-${index}`}
                id={node.contentful_id}
                to={`/memes#${node.contentful_id}`}
                fluidImg={node.img.fluid}
              >
                {node.title}
              </HomeCarouselSlide>
            ))}
          />
        </Flex>
        <HomeButtonLink to="/memes" className="meme-all-link" variant="default">
          More Memes
        </HomeButtonLink>
      </Flex>
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
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" })
  const [targetUrl, setTargetUrl] = React.useState("")

  const handleCategoryClick = url => {
    if (url === targetUrl) return
    setTargetUrl(url)
  }

  React.useEffect(() => {
    setTargetUrl(musicLinks[0].scURL)
  }, [])

  if (!targetUrl) return null

  return (
    <Flex
      className="music"
      classes={["flexRow", "justifyContentCenter", "alignItemsCenter"]}
    >
      {isMobile ? (
        <SCResponsive
          targetUrl={targetUrl}
          onCategoryClick={handleCategoryClick}
        />
      ) : (
        <SCDesktop
          targetUrl={targetUrl}
          onCategoryClick={handleCategoryClick}
        />
      )}
    </Flex>
  )
}

const SCResponsive = ({ onCategoryClick, targetUrl }) => {
  return (
    <>
      <Flex className="music-menu">
        {musicLinks.slice(0, 3).map(link => (
          <Flex
            classes={["flexRow", "alignItemsCenter"]}
            key={`music-${link.title}`}
            className={`music-category music-category--${link.name} ${
              targetUrl === link.scURL ? "music-category--active" : ""
            }`}
            onClick={onCategoryClick.bind(null, link.scURL)}
          >
            <Typography tag="h5" variant="currentColor">
              {link.title}
            </Typography>
          </Flex>
        ))}
      </Flex>
      <SoundCloudWidget url={targetUrl} />
      <Flex className="music-menu">
        {musicLinks.slice(3).map(link => (
          <Flex
            classes={["flexRow", "alignItemsCenter"]}
            key={`music-${link.title}`}
            className={`music-category music-category--${link.name} ${
              targetUrl === link.scURL ? "music-category--active" : ""
            }`}
            onClick={onCategoryClick.bind(null, link.scURL)}
          >
            <Typography tag="h5" variant="currentColor">
              {link.title}
            </Typography>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

const SCDesktop = ({ onCategoryClick, targetUrl }) => (
  <>
    <Flex classes={["flexColumn"]} className="music-menu">
      {musicLinks.map(link => (
        <Flex
          classes={["flexRow", "alignItemsCenter"]}
          key={`music-${link.title}`}
          className={`music-category music-category--${link.name} ${
            targetUrl === link.scURL ? "music-category--active" : ""
          }`}
          onClick={onCategoryClick.bind(null, link.scURL)}
        >
          <Typography tag="h5" variant="currentColor">
            {link.title}
          </Typography>
        </Flex>
      ))}
    </Flex>
    <SoundCloudWidget url={targetUrl} />
  </>
)

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

const HomeSKillIcon = ({ svg, label, color, type }) => (
  <div>
    <ReactTooltip
      id={`icon-${svg}`}
      backgroundColor={color}
      type={type}
      effect="solid"
    >
      <span>{label}</span>
    </ReactTooltip>
    <Icon data-tip data-for={`icon-${svg}`} color={color} svg={svg} />
  </div>
)

const HomeButtonLink = ({ to, children, className, variant }) => (
  <AniLoaderLink to={to} className={`${className} to-section-btn-link"`}>
    <Button variant={variant}>{children}</Button>
  </AniLoaderLink>
)

const HomeCarouselSlide = ({ id, fluidImg, children }) => (
  <AniLoaderLink to={`/memes#${id}`}>
    <Flex className="meme-img-container" classes={["flexCloumn"]}>
      <Img className="meme-img" fluid={fluidImg} />
      <Typography tag="p" variant="neutralLight">
        {children}
      </Typography>
    </Flex>
  </AniLoaderLink>
)

export default HomePage
