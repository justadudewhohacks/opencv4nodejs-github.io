module.exports = {
  siteMetadata: {
    siteName: `opencv4nodejs`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static`
      }
    }

  ],
}