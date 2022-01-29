import { NextApiRequest, NextApiResponse } from 'next';

import packageJson from '../../../package.json';

interface Health {
  version: string;
  status: string;
}

export default function async(req: NextApiRequest, res: NextApiResponse<Health>) {
  const healthData = {
    name: packageJson.name,
    version: packageJson.version,
    buildNumber: process.env.CI_BUILD_NUMBER ?? 'not-set',
    status: 'ok',
  };

  res.status(200).json(healthData);
}
