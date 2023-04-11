import pascalCase from 'pascalcase';

import useHealth from '../hooks/useHealth';

export default function Health() {
  const { data: health } = useHealth();

  if (!health) return null;

  const json = {
    appName: process.env.appName,
    appVersion: process.env.appVersion,
    ciBuildNumber: process.env.ciBuildNumber,
    APPLICATIONINSIGHTS_CONNECTION_STRING: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
  };
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

      <div
        style={{
          width: 50,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'inline-block',
        }}
      >
        <h3>Environment Variables</h3>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    </div>
  );
}

Health.title = 'Health';
