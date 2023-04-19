'use client';

import usePosts from '../../../../hooks/usePosts';
import Posts from './Posts';

export default function ClientPosts() {
  const { data: clientPosts } = usePosts();

  return <Posts title="Client Posts" posts={clientPosts} />;
}
