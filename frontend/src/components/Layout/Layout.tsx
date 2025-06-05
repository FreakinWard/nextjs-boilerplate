import { ReactNode } from 'react';

import styles from '../../../styles/Home.module.css';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: ReactNode | Array<ReactNode>;
}

export default function Layout({ children }: Props) {
  return (
    <main className={styles.main}>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
