import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Typography from "@components/Typography"
import Icon from "@components/Icon"
import Wings from "../../assets/Wings.svg"
import Logo from "../../assets/Logo.svg"

import Flex from "@components/Flex"
import Button, { BtnVariantKey } from "@components/Button"

import {
  socialLinks,
  routes,
  blogSectionRoutes,
  Route,
} from "../../utils/constants"
import "./Footer.scss"

const Footer: React.FC = props => {
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
    }
  `)
  const { location, email } = data.site.siteMetadata

  const contactInfo = [
    {
      icon: "mapMarker",
      value: location,
    },
    {
      icon: "email",
      value: email,
    },
  ]

  return (
    <footer className="footer footer-container" {...props}>
      <FooterLead />
      <Flex className="footer__contact-container--outer">
        <Flex
          className="footer__contact-container--inner"
          classes={["flexColumn"]}
        >
          <Flex classes={["flexRow", "alignItemsCenter"]}>
            <Link aria-label="Logo home page" to="/">
              <Logo className="footer__logo pk-logo" />
            </Link>
            <Flex className="footer__social-container" classes={["flexRow"]}>
              {socialLinks.map(({ variant, ...linkProps }) => (
                <FooterSocialLink
                  key={`social-${linkProps.link}`}
                  variant={variant as BtnVariantKey}
                  {...linkProps}
                />
              ))}
            </Flex>
          </Flex>
          {contactInfo.map(ele => (
            <FooterContactDetail
              key={`footer-contact-ele-${ele.value}`}
              value={ele.value}
              icon={ele.icon}
            />
          ))}
        </Flex>
        <Flex classes={["flexRow"]}>
          <FooterLinkSection
            groupClass={"flex-linear"}
            title="Pages"
            routes={routes}
          />
          <FooterLinkSection
            groupClass={"grid-dual"}
            title="Topics"
            routes={blogSectionRoutes}
          />
        </Flex>
      </Flex>
      <Flex className="footer__copyright-container">
        <Typography tag="span" variant="neutralBlank">
          © 2021 Paul Kim
        </Typography>
      </Flex>
    </footer>
  )
}

const FooterLinkSection = ({ title, routes, groupClass }) => (
  <Flex classes={["flexColumn"]} className="footer__links-section">
    <Typography tag="label" variant="neutralBlank">
      {title}
    </Typography>
    <ul className={`footer__links-items ${groupClass}`}>
      {(routes as Route[]).map(({ label, ...routeProps }) => (
        <li key={`footer-route-${label}`}>
          <Link
            className="footer__links-item"
            activeClassName="footer__links-item--active"
            {...routeProps}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </Flex>
)

const FooterLead: React.FC = () => (
  <Flex
    classes={["flexRow", "alignItemsCenter", "justifyContentCenter"]}
    className="footer__lead"
  >
    <div className="lead__border" />
    <div className="lead__wings">
      <Wings className="lead__wings-icon" />
    </div>
    <div className="lead__border" />
  </Flex>
)

const FooterContactDetail: React.FC<{ icon: string; value: string }> = ({
  icon,
  value,
}) => (
  <Flex
    className="footer__contact-item-container"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Icon
      className="footer__contact-item__icon"
      svg={icon}
      color="var(--pk-color-blank-700)"
    />
    <Typography
      className="footer__contact-value"
      tag="label"
      variant="neutralBlank"
    >
      {value}
    </Typography>
  </Flex>
)

const FooterSocialLink: React.FC<{
  icon: string
  link: string
  variant: BtnVariantKey
}> = ({ icon, link, variant, ...props }) => (
  <Button
    className="footer__social-item"
    variant={variant}
    onClick={() => window.open(link, "_blank")}
    {...props}
  >
    <Icon svg={icon} />
  </Button>
)

export { FooterLead, FooterSocialLink, FooterContactDetail, Footer as default }
