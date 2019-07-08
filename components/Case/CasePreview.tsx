import React from 'react';
import Link from 'next/link';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { Case } from '../../models/Case';
import { Tag } from '../Tag';
import 'lazysizes';
import { Media } from '../../models';

interface CasePreviewProps extends Case {
  index: number;
}

const ImageContainer = styled(animated.div)`
  ${tw`rounded-sm overflow-hidden relative bg-white hover:shadow-xl`}
  transform: scale(1);
  transition: all 0.2s;

  @media (min-width: 768px) {
    &:hover {
      z-index: 1;
      transform: scale(1.1);
    }
  }
`;

const Image = styled(animated.img)`
  display: block;
  width: 100%;
  will-change: transform;
`;

const TitleBox = styled.div`
  @media (min-width: 768px) {
    ${tw`absolute rounded-sm bg-black flex items-center inset-0 pointer-events-none`};
    mix-blend-mode: multiply;
    opacity: 0;
    transform: translate3d(-100px, 0, 0);
    transition: all 0.3s;
    z-index: 2;
  }
`;

const Title = styled(animated.div)`
  ${tw`font-mono font-bold text-lg md:text-2xl lg:text-2xl xl:text-4xl font-semiBold text-primary md:text-white relative md:px-20 w-full`}
`;

const Tags = styled.div`
  ${tw`absolute bottom-0 right-0 p-4 hidden md:flex flex-wrap flex-row-reverse items-end`}
  opacity: 0;
  z-index: 10;
  width: 50%;
`;

const Box = styled.a`
  ${tw`relative overflow-hidden w-full md:w-1/2 p-2 outline-none`}
  box-sizing: border-box;
  cursor: pointer;

  &:focus {
    outline: 2px solid var(--primary-color);
  }

  @media (min-width: 768px) {
    &:hover {
      z-index: 1;
      ${TitleBox}, ${Tags} {
        opacity: 1;
        transform: translate3d(0px, 0, 0);
      }

      ${Image} {
        opacity: 0.5;
      }
    }
  }
`;
// react spring types are wrong. Apparently fixed in 9.x
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const trans1: any = (x: number, y: number, z: number) =>
  `translate3d(${x / 22}px, ${y / 22}px, 0) scale(${z})`;

export const CasePreview: React.FC<CasePreviewProps> = ({
  title,
  media,
  slug,
  technologies,
  index,
}) => {
  const [anim, setAnim] = useSpring(() => ({
    xyz: [0, 0, 1],
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const bindGestures = useGesture({
    onMove: ({ delta }) => {
      const [x, y] = delta;
      setAnim({ xyz: [-x, -y, 1] });
    },
    onHover: ({ hovering }) => {
      if (!hovering) {
        setAnim({ xyz: [0, 0, 1] });
      }
    },
  });

  const img = media[0] || null;

  if (!img) {
    return null;
  }

  const bindings =
    typeof window !== 'undefined' && window.innerWidth >= 768
      ? bindGestures()
      : {};

  return (
    <Link href={`/case/${slug}`} passHref>
      <Box tabIndex={0} {...bindings}>
        <ImageContainer>
          <MaybeLazyImage lazy={index > 6} media={img} />
        </ImageContainer>
        <TitleBox>
          <Title style={{ transform: anim.xyz.interpolate(trans1) }}>
            {title}
          </Title>
        </TitleBox>
        <Tags>
          {technologies.map(tech => (
            <Tag
              key={tech}
              css={`
                ${tw`ml-1 mt-1`}
              `}
              inverted
            >
              {tech}
            </Tag>
          ))}
        </Tags>
      </Box>
    </Link>
  );
};

const MaybeLazyImage: React.FC<{
  lazy: boolean;
  media: Media;
}> = ({ lazy, media }) => {
  if (lazy) {
    return (
      <Image
        className="lazyload"
        alt={media.title}
        data-src={`${media.file.url}?w=600`}
      />
    );
  }
  return <Image alt={media.title} src={`${media.file.url}?w=600`} />;
};
