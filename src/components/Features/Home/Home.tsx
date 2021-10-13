import { Post } from '../../../services/postsService';
import AuthenticatedContent from './components/AuthenticatedContent';
import Header from './components/Header';
import NextInfo from './components/NextInfo';
import RenderExamples from './components/RenderExamples';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <Header />

      <AuthenticatedContent />

      <RenderExamples posts={posts} />
      <NextInfo />
    </>
  );
}
