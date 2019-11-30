import { graphql, PageRendererProps } from 'gatsby';
import { DateTime } from 'luxon';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { OriginalDate } from '../components/date';
import { Layout } from '../components/layout';
import { FadeLink } from '../components/link';
import { SEO } from '../components/seo';
import { Query, SitePageContext } from '../graphql-types';
import { rhythm, styledScale } from '../utils/typography';

interface Props extends PageRendererProps {
  pageContext: SitePageContext;
  data: Query;
}

const Title = styled.h1`
  margin: 0;
`;

const StyledOriginalDate = styled(OriginalDate)`
  display: block;
  ${styledScale(-1 / 5)};
  padding-bottom: ${rhythm(1)};
`;

const Divider = styled.hr`
  margin-bottom: ${rhythm(1)};
`;

const PostNavigator = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostTemplate: FunctionComponent<Props> = props => {
  const post = props.data.markdownRemark!;
  const excerpt = post.excerpt!;
  const frontmatter = post.frontmatter!;
  const html = post.html!;

  const siteTitle = props.data.site!.siteMetadata!.title!;
  const { previous, next } = props.pageContext;

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={frontmatter.title!} description={frontmatter.description || excerpt} />
      <Title>{frontmatter.title}</Title>
      <StyledOriginalDate date={frontmatter.date} format={DateTime.DATE_FULL} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Divider />
      {/* <Bio /> */}
      <PostNavigator>
        <li>
          {previous && (
            <FadeLink to={previous.fields!.slug!} rel="prev">
              ← {previous.frontmatter!.title}
            </FadeLink>
          )}
        </li>
        <li>
          {next && (
            <FadeLink to={next.fields!.slug!} rel="next">
              {next.frontmatter!.title} →
            </FadeLink>
          )}
        </li>
      </PostNavigator>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`;
