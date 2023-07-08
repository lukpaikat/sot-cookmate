/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `SoT Cookmate`,
    description: `Sea of Thieves cooking timer`,
    author: `Lukpaikat`,
    // TODO: ganti jadi githubnya
    siteUrl: `http://localhost:8000/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Josefin Sans`,
            file: `https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap`,
          },
          {
            name: `Syne Mono`,
            file: `https://fonts.googleapis.com/css2?family=Syne+Mono&display=swap"`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sea of Thieves CookMate`,
        short_name: `SoT CookMate`,
        start_url: `/`,
        background_color: `#1c1917`,
        theme_color: `#1c1917`,
        display: `standalone`,
        icon: `src/images/favicon-32x32.png`,
        icons: [
          {
            src: `src/images/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `src/images/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    }
  ],
};
