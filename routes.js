const routes = require('next-routes');

module.exports = routes()
  .add('index', '/')
  .add('case', '/case/:slug')
  .add('page', '/:slug');
  // .add('kontakt', '/kontakt')
// .add('case-tag', '/case/tag/:tag', 'index')
// .add('event', '/event')
// .add('screen', '/screen');
