const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withOptimizedImages = require('next-optimized-images');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const pages = require('./data/data/page.json');
const cases = require('./data/data/case.json');

module.exports = withCSS(
  withOptimizedImages(
    withTypescript({
      optimizeImages: false,
      exportPathMap: async function() {
        const paths = {
          '/': { page: '/' },
        };

        pages
          .filter(page => page.slug !== '/')
          .forEach(page => {
            paths[`/${page.slug}`] = {
              page: '/page',
              query: { slug: page.slug },
            };
          });
        cases.forEach(c => {
          paths[`/case/${c.slug}`] = { page: '/case', query: { slug: c.slug } };
        });

        return paths;
      },
      webpack: config => {
        config.plugins = config.plugins || [];

        config.plugins = [
          ...config.plugins,

          // Read the .env file
          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
          }),
        ];

        return config;
      },
    })
  )
);
