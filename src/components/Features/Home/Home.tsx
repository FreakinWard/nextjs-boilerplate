import styles from '../../../../styles/Home.module.css';
import { Post } from '../../../services/postsService';
import AppBar from '../../AppBar';
import AppHead from './components/AppHead';
import AuthenticatedContent from './components/AuthenticatedContent';
import Footer from './components/Footer';
import Header from './components/Header';
import LayoutContainer from './components/LayoutContainer';
import NextInfo from './components/NextInfo';
import RenderExamples from './components/RenderExamples';

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <div className={styles.container}>
      <AppHead />

      <LayoutContainer>
        <AppBar />
        <Header />

        <AuthenticatedContent />

        <RenderExamples posts={posts} />
        <NextInfo />
      </LayoutContainer>

      <Footer />
    </div>
  );
}
