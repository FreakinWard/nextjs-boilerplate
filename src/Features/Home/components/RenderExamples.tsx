import styles from '../../../../styles/Home.module.css';
import InformationBlock from './InformationBlock';
import ClientPosts from './Posts/ClientPosts';
import ServerPosts from './Posts/ServerPosts';

export default function RenderExamples() {
  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        {/* @ts-expect-error Async Server Component */}
        <ServerPosts />
      </div>

      <div className={styles.card}>
        <ClientPosts />
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
