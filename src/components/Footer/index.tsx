import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Typography from "@components/Typography"
import Icon from "@components/Icon"
import Wings from "@assets/Wings.svg"
import Logo from "@assets/Logo.svg"

import Flex from "@components/Flex"
import Button, { BtnVariantKey } from "@components/Button"

import { socialLinks, routes, blogSectionRoutes, Route } from "@utils/constants"
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

  return React.useMemo(
    () => (
      <footer className="footer footer-container" {...props}>
        <FooterLead />
        <Flex className="footer__contact-container--outer">
          <Flex
            className="footer__contact-container--inner"
            classes={["flexColumn"]}
          >
            <Flex classes={["flexRow", "alignItemsCenter"]}>
              <FooterLogo />
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
              groupClass="footer-link-section__list--pages"
              title="Pages"
              routes={routes}
            />
            <FooterLinkSection
              groupClass="footer-link-section__list--topics"
              title="Topics"
              routes={blogSectionRoutes}
            />
          </Flex>
        </Flex>
        <FooterCopyright />
      </footer>
    ),
    [props]
  )
}

const FooterLinkSection = ({ title, routes, groupClass }) => (
  <Flex classes={["flexColumn"]} className="footer-link-section">
    <Typography
      className="footer-link-section__title"
      tag="label"
      variant="neutralBlank"
    >
      {title}
    </Typography>
    <ul className={`footer-link-section__list ${groupClass}`}>
      {(routes as Route[]).map(({ label, ...routeProps }) => (
        <li key={`footer-route-${label}`}>
          <Link
            className="footer-link-section__list__item"
            activeClassName="footer-link-section__list__item--active"
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
    className="footer-lead footer-lead-container"
  >
    <div className="footer-lead__border" />
    <div className="footer-lead__wings">
      <Wings className="footer-lead__wings-icon" />
    </div>
    <div className="footer-lead__border" />
  </Flex>
)

const FooterContactDetail: React.FC<{ icon: string; value: string }> = ({
  icon,
  value,
}) => (
  <Flex
    className="footer-contact-detail"
    classes={["flexRow", "alignItemsCenter"]}
  >
    <Icon
      className="footer-contact-detail__icon"
      svg={icon}
      color="var(--pk-color-blank-700)"
    />
    <Typography
      className="footer-contact-detail__value"
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
}> = ({ icon, link, ...props }) => (
  <Button
    className="footer-social-link"
    onClick={() => window.open(link, "_blank")}
    {...props}
  >
    <Icon className="footer-social-link__icon" svg={icon} />
  </Button>
)

const FooterCopyright = () => (
  <Flex className="footer-copyright">
    <Typography tag="span" variant="neutralBlank">
      © 2021 Paul Kim
    </Typography>
  </Flex>
)

const FooterLogo = () => (
  <Link aria-label="Logo home page" to="/">
    <Logo className="footer-logo pk-logo" />
  </Link>
)

export { FooterLead, FooterSocialLink, FooterContactDetail, Footer as default }
