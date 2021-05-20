import { NextApiRequest, NextApiResponse } from 'next';

import packageJson from '../../../package.json';

interface Health {
  version: string;
  status: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Health>) => {
  res.status(200).json({ version: packageJson.version, status: 'ok' });
};
