import React from 'react';
import { Employee } from '../../models/Employee';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Logo } from '../Logo';
import { useSpring, animated } from 'react-spring';

interface CardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

const Wrapper = styled.div`
  ${tw`relative inline-block m-2`}
  width: calc(50% - 1rem);
  height: 220px;
  box-sizing: border-box;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Card = styled(animated.div)`
  ${tw`absolute cursor-pointer bg-gray-900 shadow-md p-4 flex items-center justify-center rounded`}
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
`;

const Content = styled.dl`
  ${tw`font-mono text-sm m-0`}
  position: relative;
  &:before {
    ${tw`text-gray-500`}
    content: '{';
    position: absolute;
    top: -20px;
    left: -14px;
  }
  &:after {
    ${tw`text-gray-500`}
    content: '}';
    position: absolute;
    bottom: -10px;
    left: -14px;
  }
`;

const Label = styled.dt`
  ${tw`text-brand inline-block`}

  &:before {
    content: '"';
  }
  &:after {
    content: '":';
  }
`;
const Value = styled.dd`
  ${tw`text-white inline-block`}
  &:before {
    content: '"';
  }
  &:not(:last-child):after {
    content: '",';
  }
  &:last-child:after {
    content: '"';
  }
`;

const Link = styled.a`
  ${tw`text-white inline-block outline-none focus:text-brand`}
`;

export const ProfileCard: React.FC<Employee> = props => {
  const [flipped, setFlipped] = React.useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  function handleClick() {
    setFlipped(state => !state);
  }

  return (
    <Wrapper onClick={handleClick}>
      <CardBack
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
        }}
      />
      <CardFront
        {...props}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        style={{ opacity: opacity.interpolate((o: any) => 1 - o), transform }}
      />
    </Wrapper>
  );
};

export const CardFront: React.FC<Employee & CardProps> = ({
  name,
  title,
  email,
  phone,
  ...rest
}) => {
  return (
    <Card {...rest}>
      <Content>
        <Label>name</Label> <Value>{name}</Value>
        <br />
        <Label>title</Label> <Value>{title}</Value>
        <br />
        <Label>email</Label>{' '}
        <Value>
          <Link href={`mailto:${email}`} onClick={e => e.stopPropagation()}>
            {email}
          </Link>
        </Value>
        <br />
        <Label>phone</Label>{' '}
        <Value>
          <Link href={`tel:${phone}`} onClick={e => e.stopPropagation()}>
            {phone}
          </Link>
        </Value>
      </Content>
    </Card>
  );
};

const CardLogo = styled(Logo)`
  ${tw`fill-black`}
  height: 48px;

  @media (max-width: 720px) {
    height: 30px;
  }
`;

export const CardBack: React.FC<CardProps> = props => {
  return (
    <Card
      {...props}
      css={`
        ${tw`bg-brand`}
      `}
    >
      <CardLogo />
    </Card>
  );
};
