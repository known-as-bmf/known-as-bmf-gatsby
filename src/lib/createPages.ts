import path from 'path';
import { aperture, chain, compose, forEach, insertAll, map, repeat, reverse } from 'ramda';

import { GatsbyCreatePages, PageInput } from '../types';

interface PostNode {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
  };
}

interface Post {
  node: PostNode;
}

export const createPages: GatsbyCreatePages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  const allMarkdown = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  if (allMarkdown.errors) {
    throw allMarkdown.errors;
  }

  // Create blog posts pages.
  const posts: Post[] = allMarkdown.data.allMarkdownRemark.edges;

  compose<
    PostNode[],
    null[],
    Array<PostNode | null>,
    Array<Array<PostNode | null>>,
    PageInput[],
    PageInput[],
    void
  >(
    forEach(createPage),
    reverse,
    chain<Array<PostNode | null>, PageInput>(([previous, current, next]) => [
      {
        path: current!.fields.slug,
        // tslint:disable-next-line:object-literal-sort-keys
        component: path.resolve(`./src/templates/blog-post.tsx`),
        context: {
          next,
          previous,
          slug: current!.fields.slug,
        },
      },
      {
        path: `/embed${current!.fields.slug}`,
        // tslint:disable-next-line:object-literal-sort-keys
        component: path.resolve(`./src/templates/embed-post.tsx`),
        context: {
          slug: current!.fields.slug,
        },
      },
    ]),
    aperture(3),
    insertAll(1)
  )(
    map(p => p.node, posts),
    repeat(null, 2)
  );

  return null;
};
