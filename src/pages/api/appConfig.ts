import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function appConfig(req: NextApiRequest, res: NextApiResponse) {
  const env = process.env;
  const { publicRuntimeConfig } = getConfig();

  const value = { publicRuntimeConfig, env };

  res.status(200).json(value);
}
