import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tag } from './Tag';

storiesOf('Tag', module)
  .add('Default', () => <Tag>Label</Tag>)
  .add('Inverted', () => (
    <div style={{ padding: '20px', background: '#222' }}>
      <Tag inverted>Inverted</Tag>
    </div>
  ));
