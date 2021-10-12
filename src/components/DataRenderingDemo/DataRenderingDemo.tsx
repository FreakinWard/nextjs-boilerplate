import styles from '../../../styles/Home.module.css';
import { Post } from '../../services/postsService';
import Posts from '../Posts';

export default function DataRenderingDemo(props: { posts: Post[]; clientPosts: Post[] }) {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <Posts title="Server render" posts={props.posts} />
      </div>

      <div className={styles.card}>
        <Posts title="Client render" posts={props.clientPosts} />
      </div>
    </div>
  );
}
