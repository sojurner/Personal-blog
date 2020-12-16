import React from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"

import MainLayout from "@components/Layouts"
import SEO from "@components/SEO"
import Flex from "@components/Flex"
import Icon from "@components/Icon"
import Typography from "@components/Typography"
import { ContactCard, SkillsCard } from "@components/Card"

import {
  BrushStroke,
  InkGrunge,
  SplashGrunge,
  DripGrunge,
} from "@components/Svg"

import avatar_1 from "../images/avatar-cartoon_pk.png"
import army from "../images/army_pk.png"

import "react-vertical-timeline-component/style.min.css"
import "@styles/index.scss"
import "@styles/pages/_aboutPage.scss"

const AboutPage = () => (
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
            Paul Kim
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
          <img
            src={avatar_1}
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
          A Little Bit About Me
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
          experiences, programming tools and tips, and {" "}
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
    <Flex
      classes={["flexColumn"]}
      className="page-about__history-container--outer"
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
          <img
            src={army}
            alt="army-pic"
            className="page-about__history__timeline__img"
          />
          <Typography variant="neutralLight">
            Four years of service with 168th Multifunctional Medical Battalion
            (Camp Walker, S. Korea) and Lyster Army Health Clinic (Fort Rucker,
            AL).
          </Typography>
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
            <Icon color="var(--pk-color-icon-csharp)" svg="csharp" />
            <Icon color="var(--pk-color-icon-js)" svg="javascript" />
            <Icon color="var(--pk-color-icon-dotnet)" svg="dotnet" />
            <Icon color="var(--pk-color-icon-react)" svg="react" />
            <Icon color="var(--pk-color-icon-sass)" svg="sass" />
            <Icon color="var(--pk-color-icon-docker)" svg="docker" />
          </Flex>
          <Typography variant="neutralLight">
            Primary front-end developer working mostly in Blazor and .net-core.
          </Typography>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </Flex>

    <Flex classes={["flexColumn"]} className="page-about__cards-container">
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

export default AboutPage
