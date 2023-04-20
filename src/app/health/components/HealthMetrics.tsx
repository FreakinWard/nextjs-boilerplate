/* istanbul ignore file */

'use client';

import useHealth from '../../../hooks/useHealth';
import HealthMetricItem from './HealthMetricItem';

export default function HealthMetrics() {
  const { data: health } = useHealth();

  if (!health) return null;

  return (
    <>
      {Object.keys(health)?.map(prop => {
        return <HealthMetricItem key={prop} prop={prop} items={health} />;
      })}
    </>
  );
}
