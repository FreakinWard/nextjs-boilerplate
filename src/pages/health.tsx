import pascalCase from 'pascalcase';

import styles from '../../styles/Home.module.css';
import useHealth from '../hooks/useHealth';

export async function getStaticProps() {
  return {
    props: {
      hideLayout: true,
    },
  };
}

export default function Health() {
  const { data: health } = useHealth();

  return (
    <div>
      <div className={styles.card}>
        <h2>Health Check</h2>
        {!health
          ? null
          : Object.keys(health)?.map(prop => {
              return (
                <div key={prop}>
                  <span>{`${pascalCase(prop)}: ${health[prop]}`}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
}
