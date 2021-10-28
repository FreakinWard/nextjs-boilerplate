import styles from '../../../../../styles/Home.module.css';
import AppBar from '../../../AppBar';
import AppHead from './AppHead';
import Footer from './Footer';

interface Props {
  hideLayout: boolean;
  children: JSX.Element;
}

export default function LayoutContainer({ hideLayout, children }: Props) {
  if (hideLayout) return children;

  return (
    <div>
      <AppHead />

      <main className={styles.main}>
        <AppBar />

        {children}
      </main>
      <Footer />
    </div>
  );
}
