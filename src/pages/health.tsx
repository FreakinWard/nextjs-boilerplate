import pascalCase from 'pascalcase';

import styles from '../../styles/Home.module.css';
import { useTelemetry } from '../components/AppTelemetry/TelemetryProvider';
import useHealth from '../hooks/useHealth';

export default function Health() {
  const { data: health } = useHealth();
  const telemetry = useTelemetry();
  const handleClick = () => telemetry.trackEvent({ name: 'testEvent', properties: { foo: 'bar' } });

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
        <button onClick={handleClick}>Track Event</button>
      </div>
    </div>
  );
}
