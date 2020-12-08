import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Typography from "@components/Typography"
import Icon from "@components/Icon"
import Avatar from "@components/Avatar"
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
      file(relativePath: { eq: "images/avatar-cartoon_pk-2.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const contactInfo = [
    {
      icon: "mapMarker",
      value: data.site.siteMetadata.location,
    },
    {
      icon: "cellphone",
      value: data.site.siteMetadata.phone,
    },
    {
      icon: "email",
      value: data.site.siteMetadata.email,
    },
  ]

  return (
    <footer className="footer-container" {...props}>
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
      <Flex>
        <Flex className="footer__contact-container" classes={["flexColumn"]}>
          {contactInfo.map((ele, index) => (
            <Flex
              key={`footer-contact-ele-${index}`}
              className="footer__contact-item-container"
              classes={["flexRow", "alignItemsCenter"]}
            >
              <Icon
                className="footer__contact-item__icon"
                svg={ele.icon}
                color="#FEE"
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
        <Flex classes={["flexColumn"]}>
          <Flex className="footer__copyright-container">
            <Avatar
              className="footer__copyright-avatar"
              fluid={data.file.childImageSharp.fluid}
              alt={data.site.siteMetadata.author
                .split(" ")
                .map(x => x[0])
                .join("")}
            />
            <Flex classes={["flexColumn", "justifyContentCenter"]}>
              <Typography tag="label" variant="neutralBlank">
                Copyright ©
              </Typography>
              <Typography tag="label" variant="neutralBlank">
                2020 Paul Kim
              </Typography>
            </Flex>
          </Flex>
          <Flex className="footer__social-container" classes={["flexRow"]}>
            {socialLinks.map(ele => (
              <div
                className="footer__social-item"
                key={`social-${ele.icon}`}
                onClick={() => window.open(ele.link, "_blank")}
              >
                <Icon svg={ele.icon} color="#FEE" />
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </footer>
  )
}

export { Footer as default }
