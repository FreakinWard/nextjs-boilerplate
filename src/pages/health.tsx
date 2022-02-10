import pascalCase from 'pascalcase';

import AppHead from '../components/Features/Home/components/AppHead';
import useHealth from '../hooks/useHealth';

export default function Health() {
  const { data: health } = useHealth();

  return (
    <div>
      <AppHead title="Health" />
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
  );
}
