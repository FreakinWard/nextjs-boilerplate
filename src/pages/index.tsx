import { InferGetStaticPropsType } from 'next';

import HomePage from '../Features/Home/';
import { fetchPosts } from './api/posts';

interface Post {
  id: number;
  title: string;
}

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

Home.title = 'Home';
