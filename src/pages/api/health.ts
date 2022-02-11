import { NextApiRequest, NextApiResponse } from 'next';

interface Health {
  version: string;
  status: string;
}

export default function async(req: NextApiRequest, res: NextApiResponse<Health>) {
  const healthData = {
    name: process.env.appName,
    version: process.env.appVersion,
    buildNumber: process.env.ciBuildNumber,
    status: 'ok',
  };

  res.status(200).json(healthData);
}
