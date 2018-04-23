module.exports = {
  pathPrefix: `/opencv4nodejs`,
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-109709749-1`,
        head: false,
        anonymize: true,
        respectDNT: true
      },
    },

  ],
}