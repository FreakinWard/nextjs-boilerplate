import { Post } from '../../../services/postsService';
import AppHead from './components/AppHead';
import Footer from './components/Footer';
import NextInfo from './components/NextInfo';
import RenderExamples from './components/RenderExamples';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <>
      <AppHead title="Home" />

      <RenderExamples posts={posts} />
      <NextInfo />

      <Footer />
    </>
  );
}
