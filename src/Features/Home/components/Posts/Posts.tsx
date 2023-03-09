import { Post } from '../../../../pages/api/posts';

interface Props {
  title: string;
  posts: Post[];
}

export default function Posts({ title, posts = [] }: Props) {
  const PostRecord = ({ post }: { post: Post }) => <div>{`${post.id} - ${post.title}`}</div>;

  return (
    <div>
      <h2>{title}</h2>
      {posts.map((post: Post) => (
        <PostRecord key={post.id} post={post} />
      ))}
      <hr />
      <div>{`Length: ${posts.length}`}</div>
    </div>
  );
}
