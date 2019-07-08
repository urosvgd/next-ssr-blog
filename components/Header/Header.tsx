import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { menu } from '../../data/menu';
import routes from '../../routes';
import { Logo } from '../Logo';
import { NavLink } from '../Navigation/NavLink';

const { Link } = routes;

const Wrapper = styled.div`
  ${tw`bg-header`};
`;

const Content = styled.div`
  ${tw`flex items-center justify-center flex-col md:flex-row md:justify-between flex-wrap pt-6 px-4 md:px-16 mx-auto`};
  max-width: 1400px;
`;

const Menu = styled.nav``;

const HeaderLogo = styled(Logo)`
  ${tw`fill-logo sm:mx-auto`};
  height: 48px;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

export const Header: React.FC<{}> = () => {
  return (
    <>
      <Wrapper>
        <Content>
          <Link href="/">
            <a aria-label="itiden.se">
              <HeaderLogo />
            </a>
          </Link>
          <Menu>
            <NavLink href="/" passHref>
              Case
            </NavLink>
            {menu.Main.map(item => (
              <NavLink key={item.label} href={`/${item.slug}`} passHref>
                {item.label}
              </NavLink>
            ))}
          </Menu>
        </Content>
      </Wrapper>
    </>
  );
};
