import { NextApiRequest, NextApiResponse } from 'next';

import { fetchPosts, Post } from '../../services/postsService';

export interface PostsTypes {
  posts: Post[];
}

export default async function posts(req: NextApiRequest, res: NextApiResponse<PostsTypes>) {
  const posts = await fetchPosts();

  res.status(200).json(posts);
}
