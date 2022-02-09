import { NextApiRequest, NextApiResponse } from 'next';

interface Health {
  version: string;
  status: string;
}

export default function async(req: NextApiRequest, res: NextApiResponse<Health>) {
  const healthData = {
    name: process.env.applicationName,
    version: process.env.applicationVersion,
    buildNumber: process.env.CI_BUILD_NUMBER ?? 'not-set',
    status: 'ok',
  };

  res.status(200).json(healthData);
}
