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
  tech: "console"
}

const routes = [
  { to: "/about", label: "about" },
  { to: "/blog", label: "blog" },
  { to: "/memes", label: "memes" },
]

const DEV: string = "dev"
const TECH: string = "tech"
const SOCIAL: string = "social"

const memeTags: string[] = [DEV, TECH, SOCIAL]

const memes = {
  "canadian-wolves": {
    title: "Canadian Wolves",
    tags: [SOCIAL],
    timestamp: "3-21-2021",
    src: "https://twitter.com/JubilationsArt/status/1103799553264771072"
  },
  "monke-skywalker": {
    title: "Monke Skywalker",
    tags: [SOCIAL],
    timestamp: "3-21-2021",
  },
  "depressed-sonic-kid": {
    title: "Faster than Light",
    tags: [SOCIAL],
    timestamp: "3-21-2021",
    src: "https://www.reddit.com/r/MemeRestoration/comments/ejqdod/depressed_kid_in_sonic_costumethe_problem_of/"
  },
  "say-no-to-robber": {
    title: "Just say no",
    tags: [SOCIAL],
    timestamp: "3-21-2021",
    src: "https://ifunny.co/picture/getting-robbed-just-say-no-your-robber-legally-cannot-take-wUqTRclf6"
  },
  "army-clown-nft": {
    title: "You know about NFTs?",
    tags: [SOCIAL],
    timestamp: "3-1-2021",
  },
  "distracted-bf_m-e": {
    title: "Elon Musk",
    tags: [TECH, SOCIAL],
    timestamp: "3-3-2021",
  },
  "cover-peek_r-p": {
    title: "Scrolling through Reddit",
    tags: [SOCIAL],
    timestamp: "3-5-2021",
  },
  "distracted-bf_cl-db": {
    title: "Impulsive JS",
    tags: [DEV],
    timestamp: "3-5-2021",
  },

  "distracted-bf_mp-s": {
    title: "Every night...",
    tags: [SOCIAL],
    timestamp: "3-7-2021",
  },
  "distracted-bf_v-c": {
    title: "Covid wars",
    tags: [SOCIAL],
    timestamp: "3-9-2021",
  },
  "joker-advice_fe": {
    title: "Just use a div",
    tags: [DEV, SOCIAL],
    timestamp: "3-11-2021",
  },
  "kilgrave_fb-i": {
    title: "Fizz Buzz Fizzbuzz",
    tags: [DEV],
    timestamp: "3-13-2021",
  },
  "kilgrave_gc-cb": {
    title: "Costco gas",
    tags: [SOCIAL],
    timestamp: "3-15-2021",
  },
  "undertaker_ps5-s": {
    title: "I just want my PS5",
    tags: [TECH],
    timestamp: "3-17-2021",
  },
}

export { socialLinks, routes, memes, memeTags }
