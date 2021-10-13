import Link from 'next/link';

import styles from '../../../../../styles/Home.module.css';
import usePosts from '../../../../hooks/usePosts';
import { Post } from '../../../../services/postsService';
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

      <Link href="/health">
        <div className={styles.card}>
          <h2>Health Check &rarr;</h2>
          <p>Access application health data</p>
        </div>
      </Link>
    </div>
  );
}
