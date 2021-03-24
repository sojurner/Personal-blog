const socialLinks = [
  {
    icon: "linkedIn",
    link: "https://www.linkedin.com/in/paulkim-sojurner/",
  },
  {
    icon: "accountFile",
    link:
      "https://drive.google.com/file/d/1orOhfD7jKerqiN1NXIVKNXt1Zmj9VBri/view?usp=sharing",
  },
  {
    icon: "github",
    link: "https://github.com/sojurner",
  },
]

const musicLinks = [
  {
    title: "LoFi",
    name: "lofi",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/lofi",
  },
  {
    title: "Ambient",
    name: "ambient",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/ambient",
  },
  {
    title: "Alt/Rock",
    name: "alt-rock",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/rock-alternative",
  },
  {
    title: "Orchestra",
    name: "orchestra",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/orchestra",
  },
  {
    title: "Indie/Folk",
    name: "indie-folk",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/indie-folk",
  },
  {
    title: "Majestic",
    name: "majestic",
    scURL: "https://soundcloud.com/paul-kim-590010884/sets/majestic",
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
  culture: "social",
  dev: "codetags",
  social: "social",
  tech: "console",
}

const routes = [
  { to: "/blog", label: "blog" },
  { to: "/memes", label: "memes" },
  {
    to: "/about",
    label: "about",
    sub: [
      { to: "/about#contact", label: "contact" },
      { to: "/about#history", label: "history" },
      {
        to: "/about#music",
        label: "music",
      },
    ],
  },
]

export { socialLinks, routes, musicLinks }
