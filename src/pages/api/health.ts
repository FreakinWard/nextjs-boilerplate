import { NextApiRequest, NextApiResponse } from 'next';

export interface HealthTypes {
  version: string;
  status: string;
}

export default function health(req: NextApiRequest, res: NextApiResponse<HealthTypes>) {
  const healthData = {
    name: process.env.appName,
    version: process.env.appVersion,
    buildNumber: process.env.ciBuildNumber ?? 'not-set',
    status: 'ok',
  };

  res.status(200).json(healthData);
}
