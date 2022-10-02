import { Post } from '../../services/postsService';
import NextInfo from './components/NextInfo';
import RenderExamples from './components/RenderExamples';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <RenderExamples posts={posts} />
      <NextInfo />
    </>
  );
}
