import { NextApiRequest, NextApiResponse } from 'next';

interface Post {
  id: number;
  title: string;
}

interface Posts {
  posts: Post[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Posts>) => {
  const url = 'http://my-json-server.typicode.com/typicode/demo/posts';
  const response = await fetch(url);
  const posts = await response.json();

  res.status(200).json(posts);
};
