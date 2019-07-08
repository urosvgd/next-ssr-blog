import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProfileCard, CardFront, CardBack } from './ProfileCard';

const profile = {
  id: 'one',
  name: 'John Doe',
  title: 'Awesome',
  email: 'john@doe.io',
  phone: '555-555 555',
};

storiesOf('ProfileCard', module)
  .add('Default', () => <ProfileCard {...profile} />)
  .add('Front', () => <CardFront {...profile} />)
  .add('Back', () => <CardBack />);
