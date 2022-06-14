import { NextApiRequest, NextApiResponse } from 'next';

interface Health {
  version: string;
  status: string;
}

export default function async(req: NextApiRequest, res: NextApiResponse<Health>) {
  if (req.method === 'POST') {
    // Process a POST request
    res.status(200).json({ data: 'success' });
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
}
