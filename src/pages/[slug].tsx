import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { map, replace } from 'ramda';
import { getPostBySlug, getPostSlugs } from '@/lib/api';
import Post from '@/types/post';
import Layout from '@/components/layout';

type Props = {
  post: Post;
};

type Renderer = {
  language: string;
  value: string;
};

const renderers = {
  code: ({ language, value }: Renderer) => {
    return (
      <SyntaxHighlighter
        style={nord}
        language={language}
        children={value}
        customStyle={{ marginBottom: '2em' }}
      />
    );
  }
};

function BlogPost({ post }: Props) {
  return (
    <Layout>
      <article className="px-6 max-w-2xl mx-auto">
        <ReactMarkdown renderers={renderers} children={post.content} />
      </article>
    </Layout>
  );
}

export default BlogPost;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, true);

  return {
    props: {
      post
    }
  };
}

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  const actualSlugs = map(replace(/\.md$/, ''))(slugs);

  return {
    paths: actualSlugs.map((slug) => {
      return {
        params: { slug }
      };
    }),
    fallback: false
  };
}
