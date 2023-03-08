import styles from '../../../../styles/Home.module.css';
import usePosts from '../../../hooks/usePosts';
import { Post } from '../../../pages/api/posts';
import InformationBlock from './InformationBlock';
import Posts from './Posts';

interface Props {
  posts: Post[];
}

export default function RenderExamples({ posts }: Props) {
  const { data: clientPosts } = usePosts();

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <Posts title="Server render" posts={posts} />
      </div>

      <div className={styles.card}>
        <Posts title="Client render" posts={clientPosts} />
      </div>

      <InformationBlock
        url="/health"
        title="Health Check"
        description="Access application health data"
      />

      <InformationBlock
        url="/secured"
        title="Authentication"
        description="Secure a page using Next-Auth"
      />
    </div>
  );
}
