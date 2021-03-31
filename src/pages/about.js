import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import loadable from "@loadable/component"
import { useInView } from "react-intersection-observer"

import { ContactCard, SkillsCard } from "@components/Card"
import BrushStroke from "@assets/BrushStroke.svg"
import InkGrunge from "@assets/InkGrunge.svg"
import SplashGrunge from "@assets/SplashGrunge.svg"
import DripGrunge from "@assets/DripGrunge.svg"

import "react-vertical-timeline-component/style.min.css"
import "@styles/index.scss"
import "@styles/pages/_aboutPage.scss"

const Img = loadable(() => import("gatsby-image"))
const Flex = loadable(() => import("@components/Flex"))
const SEO = loadable(() => import("@components/SEO"))
const MainLayout = loadable(() => import("@components/Layouts"))
const Icon = loadable(() => import("@components/Icon"))
const Typography = loadable(() => import("@components/Typography"))

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp(filter: { fluid: { originalName: { regex: "/pk/" } } }) {
        totalCount
        nodes {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [avatar, army] = data.allImageSharp.nodes

  const [historyRef, historyInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })
  const [cardsRef, cardsInView] = useInView({
    threshold: 0.01,
    triggerOnce: true,
  })

  return (
    <MainLayout className="page-about">
      <SEO title="About" />
      <Flex
        classes={["flexColumn"]}
        className="page-about__landing-container--outer"
      >
        <Flex className="page-about__landing-container--inner-1">
          <Flex
            className="page-about__landing-greeting"
            classes={["flexColumn", "alignItemsStart"]}
          >
            <Typography tag="h1" className="page-about__landing-greeting__name">
              About
            </Typography>
            <Typography
              tag="h3"
              variant="neutralLight"
              className="page-about__landing-greeting__motto"
            >
              - You miss 100% of the shots you don't make
            </Typography>
          </Flex>
          <Flex className="page-about__landing-greeting__imgs">
            <Img
              fluid={avatar.fluid}
              alt={"personal pic"}
              className="page-about__landing-greeting__imgs-profile"
            />
            <BrushStroke className="page-about__brush-stroke page-about__landing-greeting__imgs-brushstroke" />
          </Flex>
        </Flex>
        <Flex
          className="page-about__landing-container--inner-2"
          classes={["flexColumn"]}
        >
          <Typography
            className="page-about__landing-greeting__about-desc"
            tag="h2"
            variant="neutralDefault"
          >
            Welcome!
          </Typography>
          <Typography
            tag="h2"
            variant="neutralDark"
            className="page-about__landing-greeting__about-header"
          >
            Who Am I?
          </Typography>
          <div className="page-about__landing-greeting__about-header-div" />
          <Typography
            tag="h4"
            className="page-about__landing-greeting__about-skills"
            variant="neutralLight"
          >
            I'm a programmer with a huge{" "}
            <Typography
              tag="span"
              variant="neutralDark"
              onClick={() =>
                window.open(
                  "https://images-na.ssl-images-amazon.com/images/I/51hethHdQnL.jpg",
                  "_blank"
                )
              }
            >
              passion for root
            </Typography>
            . I currently work as a full-stack dev with emphasis on front-end.
            Aside from work, I love <strong>Hiking</strong>, I'm an avid fan of{" "}
            <strong>Baseball</strong>, and I love eating{" "}
            <strong>Pork Rinds</strong>.
          </Typography>
          <Typography
            tag="h2"
            className="page-about__landing-greeting__about-header"
            variant="neutralDark"
          >
            What You'll Find Here
          </Typography>
          <div className="page-about__landing-greeting__about-header-div" />
          <Typography
            tag="h4"
            className="page-about__landing-greeting__about-skills"
            variant="neutralLight"
          >
            As of now, I'll blog just about anything that comes to my mind.
            Typically, I'll stick to what I know: personal interests and
            experiences, programming tools and tips, and{" "}
            <Typography
              tag="span"
              variant="neutralDark"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=sDj72zqZakE",
                  "_blank"
                )
              }
            >
              falling waffle.
            </Typography>
          </Typography>
        </Flex>
      </Flex>

      <span ref={historyRef} />
      <Flex
        classes={["flexColumn"]}
        className={`page-about__history-container--outer section--transition ${
          historyInView ? "section--visible" : "section--hide"
        }`}
      >
        <Flex
          classes={["flexColumn", "alignItemsStart"]}
          className="page-about__history-container--inner"
        >
          <Typography tag="h1" className="page-about__history__title">
            History
          </Typography>
          <Typography
            tag="h3"
            variant="neutralLight"
            className="page-about__history__motto"
          >
            - The plural of anecdote is not statistics.
          </Typography>
          <DripGrunge className="page-about__history__bg" />
        </Flex>
        <VerticalTimeline className="page-about__history__timeline">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2013 - 2017"
            icon={<Icon svg="military" color="#b32158" />}
          >
            <Typography tag="h3">US Army</Typography>

            <Typography
              tag="h4"
              variant="neutralLight"
              className="vertical-timeline-element-subtitle"
            >
              Combat Medic
            </Typography>

            <Typography
              variant="neutralLight"
              className="page-about__history__timeline__p"
            >
              Four years of service with 168th Multifunctional Medical Battalion
              (Camp Walker, S. Korea) and Lyster Army Health Clinic (Fort
              Rucker, AL).
            </Typography>
            <Img
              fluid={army.fluid}
              alt="army-pic"
              className="page-about__history__timeline__img"
            />
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2018 - Now"
            icon={<Icon svg="codetags" color="#3c354a" />}
          >
            <Typography tag="h3">Catalyst Healthcare</Typography>
            <Typography
              tag="h4"
              variant="neutralLight"
              className="vertical-timeline-element-subtitle"
            >
              Front-end Developer
            </Typography>
            <Flex className="page-about__history__timeline__skill-icons">
              <Icon color="var(--pk-color-icon-dotnet)" svg="dotnet" />
              <Icon color="var(--pk-color-icon-dotnet)" svg="blazor" />
              <Icon color="var(--pk-color-icon-react)" svg="react" />
              <Icon color="var(--pk-color-icon-sass)" svg="sass" />
              <Icon color="var(--pk-color-icon-docker)" svg="docker" />
            </Flex>
            <Typography
              variant="neutralLight"
              className="page-about__history__timeline__p"
            >
              Primary front-end developer working mostly in Blazor and .asp-net
              core.
            </Typography>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </Flex>

      <span ref={cardsRef} />
      <Flex
        classes={["flexColumn"]}
        className={`page-about__cards-container section--base ${
          cardsInView ? "section--visible" : "section--hide"
        }
      `}
      >
        <Flex className="page-about__cards-container--inner-1">
          <Flex
            className="page-about__cards-skills"
            classes={["flexColumn", "alignItemsStart"]}
          >
            <Typography tag="h1" className="page-about__cards-skills__title">
              Skillset
            </Typography>
            <Typography
              tag="h3"
              variant="neutralLight"
              className="page-about__cards-skills__motto"
            >
              - BDD: Bug Driven Development
            </Typography>
            <InkGrunge className="page-about__ink-grunge" />
          </Flex>
          <SkillsCard className="page-about__card-skills" />
        </Flex>
        <Flex className="page-about__cards-container--inner-2">
          <Flex
            className="page-about__cards-contact"
            classes={["flexColumn", "alignItemsStart"]}
          >
            <span id="contact" />

            <Typography tag="h1" className="page-about__cards-contact__title">
              Contact
            </Typography>
            <Typography
              tag="h3"
              variant="neutralLight"
              className="page-about__cards-contact__motto"
            >
              - 20% of the time, 24/7 contact all the time.
            </Typography>
            <SplashGrunge className="page-about__splash-grunge" />
          </Flex>
          <ContactCard className="page-about__card-contact" />
        </Flex>
      </Flex>
    </MainLayout>
  )
}

export default AboutPage
