import styles from '../../../../../styles/Home.module.css';
import Header from './Header';

interface Props {
  children: JSX.Element | Array<JSX.Element>;
}

export default function LayoutContainer({ children }: Props) {
  return (
    <main className={styles.main}>
      <Header />
      {children}
    </main>
  );
}
