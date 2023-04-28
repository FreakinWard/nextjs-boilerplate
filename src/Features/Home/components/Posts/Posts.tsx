import { PostType } from '../../../../app/api/posts/route';

interface Props {
  title: string;
  posts: PostType[];
}

export default function Posts({ title, posts = [] }: Props) {
  const PostRecord = ({ post }: { post: PostType }) => <div>{`${post.id} - ${post.title}`}</div>;

  return (
    <div>
      <h2>{title}</h2>
      {posts.map((post: PostType) => (
        <PostRecord key={post.id} post={post} />
      ))}
      <hr />
      <div>{`Length: ${posts.length}`}</div>
    </div>
  );
}
