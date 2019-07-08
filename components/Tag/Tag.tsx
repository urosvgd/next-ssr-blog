import React from 'react';
import styled, { css } from 'styled-components';
import tw from 'tailwind.macro';

interface TagProps {
  children: string;
  inverted?: boolean;
}

interface TagsProps {
  tags: string[];
  inverted?: boolean;
}

const invertedStyle = css`
  ${tw`text-gray-100 hover:text-white`};
`;

const Box = styled.div<TagProps>`
  ${tw`px-3 py-1 rounded-full border-solid border text-tertiary text-xs inline-block font-mono font-bold hover:text-primary`};

  ${p => (p.inverted ? invertedStyle : '')}
`;

export const Tag: React.FC<TagProps> = ({ children, ...rest }) => {
  return <Box {...rest}>{children}</Box>;
};

export const Tags: React.FC<TagsProps> = ({ tags, inverted }) => {
  return (
    <>
      {tags.map(tag => (
        <Tag
          key={tag}
          css={`
            ${tw`mr-1 mb-1`}
          `}
          inverted={inverted}
        >
          {tag}
        </Tag>
      ))}
    </>
  );
};
