import Link from 'next/link';

import styles from '../../../styles/Home.module.css';

export default function Header() {
  return (
    <h1 className={styles.title}>
      Welcome to <Link href="https://nextjs.org">Next.js!</Link>
    </h1>
  );
}
