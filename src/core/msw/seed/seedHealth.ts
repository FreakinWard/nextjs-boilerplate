import { HealthTypes } from '../../../pages/api/health';
import { SeedRest } from '../types';

const seedHealth: SeedRest<HealthTypes> = {
  url: '*/api/health',
  data: { version: 'versionValue', status: 'statusValue' },
};

export default seedHealth;
