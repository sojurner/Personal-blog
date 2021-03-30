const socialLinks = [
  {
    icon: "linkedIn",
    link: "https://www.linkedin.com/in/paulkim-sojurner/",
    variant: "secondary",
  },
  {
    icon: "accountFile",
    link:
      "https://drive.google.com/file/d/1orOhfD7jKerqiN1NXIVKNXt1Zmj9VBri/view?usp=sharing",
    variant: "positive",
  },
  {
    icon: "github",
    link: "https://github.com/sojurner",
    variant: "negative",
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

const blogTypeRef = {
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

const tagIconRef = {
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
  { to: "/about", label: "about" },
]

const blogSectionRoutes = [
  {
    to: "/blog/code",
    label: "code",
  },
  {
    to: "/blog/culture",
    label: "culture",
  },
  {
    to: "/blog/military",
    label: "military",
  },
  {
    to: "/blog/storytelling",
    label: "storytelling",
  },
]

const skillsetIcons = [
  {
    svg: "javascript",
    color: "var(--pk-color-icon-js)",
  },
  {
    svg: "typescript",
    color: "var(--pk-color-icon-ts)",
  },
  {
    svg: "nodejs",
    color: "var(--pk-color-icon-node)",
  },
  {
    svg: "react",
    color: "var(--pk-color-icon-react)",
  },
  {
    svg: "csharp",
    color: "var(--pk-color-icon-csharp)",
  },
  {
    svg: "dotnet",
    color: "var(--pk-color-icon-dotnet)",
  },
  {
    svg: "blazor",
    color: "var(--pk-color-icon-dotnet)",
  },
  {
    svg: "html",
    color: "var(--pk-color-icon-html)",
  },
  {
    svg: "sass",
    color: "var(--pk-color-icon-sass)",
  },
  {
    svg: "css",
    color: "var(--pk-color-icon-css)",
  },
]

export {
  socialLinks,
  tagIconRef,
  blogTypeRef,
  blogSectionRoutes,
  skillsetIcons,
  routes,
  musicLinks,
}
