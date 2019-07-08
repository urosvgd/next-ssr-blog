import React from 'react';
import { storiesOf } from '@storybook/react';
import { getCases } from '../../data/case';
import { CasePreview } from './CasePreview';
import { CaseGrid } from './CaseGrid';

const cases = getCases();

storiesOf('CasePreview', module)
  .add('Default', () => <CasePreview index={0} {...cases[0]} />)
  .add('Grid', () => (
    <div style={{ marginTop: '100px' }}>
      <CaseGrid cases={cases} />
    </div>
  ));
