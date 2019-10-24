import { graphql, PageRendererProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { Query, SitePageContext } from '../graphql-types';
import { rhythm, styledScale } from '../utils/typography';

interface Props extends PageRendererProps {
  pageContext: SitePageContext;
  data: Query;
}

const Content = styled.div`
  padding: ${`0 ${rhythm(3 / 4)}`};
`;

const Date = styled.p`
  display: block;
  ${styledScale(-1 / 5)};
  margin-bottom: ${rhythm(1)};
  margin-top: ${rhythm(-1)};
`;

const EmbedPostTemplate = (props: Props) => {
  const post = props.data.markdownRemark!;
  const frontmatter = post.frontmatter!;
  const html = post.html!;

  return (
    <Content>
      <h1>{frontmatter.title}</h1>
      <Date>{frontmatter.date}</Date>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Content>
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
