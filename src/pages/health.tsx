import pascalCase from 'pascalcase';

import useHealth from '../hooks/useHealth';

export default function Health() {
  const { data: health } = useHealth();

  if (!health) return null;

  return (
    <div>
      <h2>Health Check</h2>
      {Object.keys(health)?.map(prop => {
        return (
          <div key={prop}>
            <span
              style={{
                width: 50,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              {`${pascalCase(prop)}:  ${health[prop]}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

Health.title = 'Health';
