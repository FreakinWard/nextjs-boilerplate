import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const appConfig = { foo: 'bar' };
  res.status(200).json(appConfig);
};
