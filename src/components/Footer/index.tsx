import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Typography from "@components/Typography"
import Icon from "@components/Icon"
import { Logo, Wings } from "@components/Svg"
import Flex from "@components/Flex"

import { socialLinks } from "../../utils/constants"
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
    <footer className="footer-container" {...props}>
      <Flex
        classes={["flexRow", "alignItemsCenter", "justifyContentCenter"]}
        className="footer__wings-div"
      >
        <div />
        <Wings />
        <div />
      </Flex>
      <Flex
        className="footer__links-container"
        classes={["flexRow", "alignItemsCenter"]}
      >
        <Link
          to="/about"
          className="footer__links-item"
          activeClassName="footer__links-item--active"
        >
          About
        </Link>
        <div className="footer__links-divider" />
        <Link
          to="/blog"
          className="footer__links-item"
          activeClassName="footer__links-item--active"
        >
          Blog
        </Link>
        <div className="footer__links-divider" />
        <Link
          to="/contact"
          className="footer__links-item"
          activeClassName="footer__links-item--active"
        >
          Contact
        </Link>
      </Flex>
      <Flex className="footer__contact-container--outer">
        <Flex
          className="footer__contact-container--inner"
          classes={["flexColumn"]}
        >
          {contactInfo.map((ele, index) => (
            <Flex
              key={`footer-contact-ele-${index}`}
              className="footer__contact-item-container"
              classes={["flexRow", "alignItemsCenter"]}
            >
              <Icon
                className="footer__contact-item__icon"
                svg={ele.icon}
                color="var(--pk-color-blank-700)"
              />
              <Typography
                className="footer__contact-value"
                variant="neutralBlank"
              >
                {ele.value}
              </Typography>
            </Flex>
          ))}
        </Flex>
        <Flex className="footer__copyright-social" classes={["flexColumn"]}>
          <Flex className="footer__social-container" classes={["flexRow"]}>
            {socialLinks.map(ele => (
              <div
                className="footer__social-item"
                key={`social-${ele.icon}`}
                onClick={() => window.open(ele.link, "_blank")}
              >
                <Icon svg={ele.icon} color="var(--pk-color-blank-700)" />
              </div>
            ))}
          </Flex>
          <Flex className="footer__copyright-container">
            <Logo className="footer__copyright-logo" />
            <Flex classes={["flexColumn", "justifyContentCenter"]}>
              <Typography tag="label" variant="neutralBlank">
                Copyright ©
              </Typography>
              <Typography tag="label" variant="neutralBlank">
                2020 Paul Kim
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </footer>
  )
}

export { Footer as default }
