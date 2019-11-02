import { PageRendererProps } from 'gatsby';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { rhythm, styledScale } from '../utils/typography';
import { FadeLink } from './link';

interface Props extends PageRendererProps {
  title: string;
  children: ReactNode;
}

const StyledH1 = styled.h1`
  ${styledScale(1.5)};
  margin: 0;
  padding-bottom: ${rhythm(1.5)};
`;

const StyledH3 = styled.h3`
  margin: 0;
  padding-bottom: ${rhythm(1)};
`;

const StyledLink = styled(FadeLink)`
  box-shadow: none;
  color: inherit;
  text-decoration: none;
`;

const Content = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(32)};
  padding: ${`${rhythm(1)} ${rhythm(3 / 4)}`};
`;

export const Layout = (props: Props) => {
  const { location, title, children } = props;
  const rootPath = `/`;

  const HeaderTitle = location.pathname === rootPath ? StyledH1 : StyledH3;

  return (
    <Content>
      <header>
        <HeaderTitle>
          <StyledLink to={`/`}>{title}</StyledLink>
        </HeaderTitle>
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Content>
  );
};
