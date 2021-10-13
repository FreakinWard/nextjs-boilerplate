import { InferGetStaticPropsType } from 'next';

import HomePage from '../components/Features/Home/';
import { fetchPosts, Post } from '../services/postsService';

interface Props {
  props: {
    posts: Post[];
  };
}

export async function getStaticProps(): Promise<Props> {
  const posts = await fetchPosts();

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <HomePage posts={posts} />;
}
