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
  culture: {
    textVariant: "positiveDark",
    chipVariant: "positive",
    tagVariant: "positive",
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
  culture: "social"
}

const routes = [
  { to: "/about", label: "about" },
  { to: "/blog", label: "blog" },
  { to: "/contact", label: "contact" },
]

export { socialLinks, routes }
