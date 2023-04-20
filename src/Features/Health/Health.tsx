import HealthEnvironmentVariables from './components/HealthEnvironmentVariables';
import HealthMetrics from './components/HealthMetrics';

export default function Health() {
  return (
    <>
      <h2>Health Check</h2>
      <HealthMetrics />

      <HealthEnvironmentVariables />
    </>
  );
}
