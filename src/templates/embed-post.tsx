import { graphql, PageRendererProps } from 'gatsby';
import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Query, SitePageContext } from '../graphql-types';
import { rhythm } from '../utils/typography';

interface Props extends PageRendererProps {
  pageContext: SitePageContext;
  data: Query;
}

// remove annoying "always-on" y scrollbar in embed
const GlobalStyle = createGlobalStyle`
  html {
    overflow-y: auto;
  }
`;

const Content = styled.div`
  padding: ${`0 ${rhythm(3 / 4)}`};
`;

const Title = styled.h1`
  margin: ${`${rhythm(1.2)} 0`};
`;

const EmbedPostTemplate = (props: Props) => {
  const post = props.data.markdownRemark!;
  const frontmatter = post.frontmatter!;
  const html = post.html!;

  return (
    <Fragment>
      <GlobalStyle />
      <Content>
        <Title>{frontmatter.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Content>
    </Fragment>
  );
};

export default EmbedPostTemplate;

export const pageQuery = graphql`
  query EmbedPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
