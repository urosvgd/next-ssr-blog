import React from 'react';
import { Media as MediaInterface } from '../../models/Media';
import styled from 'styled-components';
import tw from 'tailwind.macro';

interface MediaProps {
  media: MediaInterface;
}

const Wrapper = styled.div`
  ${tw`mb-8 mx-auto`}
  max-width: 100%;
`;

const Image = styled.img`
  ${tw`block mx-auto`}
  max-width: 100%;
`;

const Caption = styled.figcaption`
  ${tw`font-mono text-sm text-tertiary mx-auto block text-center p-2`}
`;

function isImage(type: string): boolean {
  return type.includes('image/');
}

export const Media: React.FC<MediaProps> = ({ media }) => {
  const { title, description, file } = media;

  if (isImage(media.file.contentType)) {
    const { width } = file.details.image;
    return (
      <Wrapper style={{ width }}>
        <figure>
          <Image
            alt={title}
            src={media.file.url}
          />
          {description && <Caption>{description}</Caption>}
        </figure>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={{ maxWidth: '800px' }}>
      <video controls muted width="100%" src={file.url} />
    </Wrapper>
  );
};
