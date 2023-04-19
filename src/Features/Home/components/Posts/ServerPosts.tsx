import Posts from './Posts';

export default async function ServerPosts() {
  const posts = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`).then(res => res.json());

  return <Posts title="Server Posts" posts={posts} />;
}
