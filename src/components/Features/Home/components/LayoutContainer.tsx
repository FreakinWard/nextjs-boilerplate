import styles from '../../../../../styles/Home.module.css';

export default function LayoutContainer({ children }: { children: Array<JSX.Element> }) {
  return <main className={styles.main}>{children}</main>;
}
