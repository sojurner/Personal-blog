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
    label: "JavaScript",
    color: "var(--pk-color-icon-js)",
    type: "light",
  },
  {
    svg: "typescript",
    label: "TypeScript",
    color: "var(--pk-color-icon-ts)",
    type: "dark",
  },
  {
    svg: "nodejs",
    label: "NodeJS",
    color: "var(--pk-color-icon-node)",
    type: "dark",
  },
  {
    svg: "react",
    label: "React",
    color: "var(--pk-color-icon-react)",
    type: "light",
  },
  {
    svg: "csharp",
    label: "C#",
    color: "var(--pk-color-icon-csharp)",
    type: "dark",
  },
  {
    svg: "dotnet",
    label: ".net 5",
    color: "var(--pk-color-icon-dotnet)",
    type: "dark",
  },
  {
    svg: "blazor",
    label: "Blazor",
    color: "var(--pk-color-icon-dotnet)",
    type: "dark",
  },
  {
    svg: "html",
    label: "HTML5",
    color: "var(--pk-color-icon-html)",
    type: "dark",
  },
  {
    svg: "sass",
    label: "SASS",
    color: "var(--pk-color-icon-sass)",
    type: "dark",
  },
  {
    svg: "css",
    label: "CSS3",
    color: "var(--pk-color-icon-css)",
    type: "dark",
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
