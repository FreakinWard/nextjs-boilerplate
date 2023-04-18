export default function HealthEnvironmentVariables() {
  const environmentVariables = {
    appName: process.env.appName,
    appVersion: process.env.appVersion,
    ciBuildNumber: process.env.ciBuildNumber,
    APPLICATIONINSIGHTS_CONNECTION_STRING: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
  };

  return (
    <div
      style={{
        width: 50,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
      }}
    >
      <h3>Environment Variables</h3>
      <pre>{JSON.stringify(environmentVariables, null, 2)}</pre>
    </div>
  );
}
