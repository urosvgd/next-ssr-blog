const fs = require('fs');
const sm = require('sitemap');
const { exportPathMap } = require('./next.config');

async function generateSitemap() {
  const pages = await exportPathMap();
  const urls = Object.entries(pages).map(([url]) => ({
    url,
  }));

  const sitemap = sm.createSitemap({
    hostname: 'https://itiden.se',
    cacheTime: 60000,
    urls: urls,
  });

  fs.writeFileSync('./out/sitemap.xml', sitemap.toString());
}

generateSitemap();