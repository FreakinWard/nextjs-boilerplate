import { InferGetStaticPropsType } from 'next';

import HomePage from '../Features/Home/';

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
  async function fetchPosts() {
    const url = 'https://my-json-server.typicode.com/typicode/demo/posts';
    const response = await fetch(url);
    return response.json();
  }

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
