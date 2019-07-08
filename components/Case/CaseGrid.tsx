import React from 'react';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import { Case } from '../../models/Case';
import { CasePreview } from './CasePreview';

interface CaseGridProps {
  cases: Case[];
}

const Box = styled.div`
  ${tw`w-full flex flex-wrap m-auto`}
  max-width: 1200px;
`;

export const CaseGrid: React.FC<CaseGridProps> = ({ cases }) => {
  return (
    <Box>
      {cases.map((data, i) => (
        <CasePreview key={data.slug} index={i} {...data} />
      ))}
    </Box>
  );
};
