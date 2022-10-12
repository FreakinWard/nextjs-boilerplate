import styles from '../../../../styles/Home.module.css';
import InformationBlock from './InformationBlock';

export default function NextInfo() {
  return (
    <>
      <p className={styles.description}>
        Get started by editing <code className={styles.code}>pages/index.tsx</code>
      </p>

      <div className={styles.grid}>
        <InformationBlock
          url="https://nextjs.org/docs"
          title="Documentation"
          description="Find in-depth information about Next.js features and API."
        />
        <InformationBlock
          url="https://nextjs.org/learn"
          title="Learn"
          description="Learn about Next.js in an interactive course with quizzes!"
        />
        <InformationBlock
          url="https://github.com/vercel/next.js/tree/master/examples"
          title="Examples"
          description="Discover and deploy boilerplate example Next.js projects."
        />
        <InformationBlock
          url="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          title="Deploy"
          description="Instantly deploy your Next.js site to a public URL with Vercel."
        />
      </div>
    </>
  );
}
