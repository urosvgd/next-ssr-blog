import { configure, addDecorator } from '@storybook/react';
import { GlobalStyles } from '../components/Styles';
import Router from 'next/router';

Router.router = {
  push: () => {},
  prefetch: () => {},
};

// automatically import all files ending in *.stories.js
const req = require.context('../components', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <>
    <GlobalStyles />
    {story()}
  </>
));

configure(loadStories, module);
