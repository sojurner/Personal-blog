const path = require("path")

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "PK",
    phone: "(303) - 257 - 7590",
    description: "portfolio and blog",
    url: "https://paul-y.kim",
    location: "North America, Earth",
    email: "paul.kim.0591@protonmail.com",
    description: "My portfolio website",
    author: "Paul Kim",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@typings": path.resolve(__dirname, "src/typings"),
          "@utils/*": path.resolve(__dirname, "src/utils"),
          "@pages/*": path.resolve(__dirname, "src/pages"),
        },
        extensions: [],
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "src",
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        name: "src",
        path: `${__dirname}/src`,
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-dark-mode",
    "gatsby-plugin-transition-link",
  ],
}
