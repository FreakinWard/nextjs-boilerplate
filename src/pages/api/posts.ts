import { NextApiRequest, NextApiResponse } from 'next';

export interface Post {
  id: number;
  title: string;
}

export interface PostsTypes {
  posts: Post[];
}

export async function fetchPosts() {
  const url = 'https://my-json-server.typicode.com/typicode/demo/posts';
  const response = await fetch(url);
  return response.json();
}

export default async function posts(req: NextApiRequest, res: NextApiResponse<PostsTypes>) {
  const posts = await fetchPosts();

  res.status(200).json(posts);
}
