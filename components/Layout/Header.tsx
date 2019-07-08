import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Header = styled.div`
  ${tw`pt-6 pb-12  md:pb-32 md:pt-20 bg-header`}
`;

export const HeaderContent = styled.div`
  ${tw`m-auto px-4`}
  max-width: 800px;
`;