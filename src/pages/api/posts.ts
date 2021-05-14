import { NextApiRequest, NextApiResponse } from 'next';

import { fetchPosts, Post } from '../../services/postsService';

interface Response {
  posts: Post[];
}

export default async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const posts = await fetchPosts();

  res.status(200).json(posts);
};
