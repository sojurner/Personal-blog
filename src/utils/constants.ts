const socialLinks = [
  {
    icon: "github",
    link: "https://github.com/sojurner",
  },
  {
    icon: "linkedIn",
    link: "https://www.linkedin.com/in/paulkim-sojurner/",
  },
]

export const blogTypeRef = {
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

export const tagIconRef = {
  code: "codetags",
  military: "military",
  storytelling: "book",
}

const routes = [
  { to: "/about", label: "about" },
  { to: "/blog", label: "blog" },
  { to: "/contact", label: "contact" },
]

export { socialLinks, routes }
