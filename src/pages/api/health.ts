import { NextApiRequest, NextApiResponse } from 'next';

import packageJson from '../../../package.json';

interface Health {
  version: string;
  status: string;
}

export default async function health (req: NextApiRequest, res: NextApiResponse<Health>) {
  const healthData = { name: packageJson.name, version: packageJson.version, status: 'ok' };

  res.status(200).json(healthData);
};
