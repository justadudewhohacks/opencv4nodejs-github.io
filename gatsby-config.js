module.exports = {
  siteMetadata: {
    siteName: `opencv4nodejs`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`
      }
    }

  ],
}