import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

import styles from '../../../../styles/Home.module.css';
import { Post } from '../../../services/postsService';
import AppBar from '../../AppBar';
import AppHead from './components/AppHead';
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

        <AuthenticatedTemplate>
          <>Secret thing</>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <>Public thing</>
        </UnauthenticatedTemplate>
        <RenderExamples posts={posts} />
        <NextInfo />
      </LayoutContainer>

      <Footer />
    </div>
  );
}
