import { NextApiRequest, NextApiResponse } from 'next';

export interface HealthTypes {
  version: string;
  status: string;
}

function envVar(propName) {
  return process.env[propName] || 'undefined';
}

export default function health(req: NextApiRequest, res: NextApiResponse<HealthTypes>) {
  const healthData = {
    name: process.env.appName,
    version: process.env.appVersion,
    buildNumber: process.env.ciBuildNumber ?? 'not-set',
    appInsightsConnectionString: envVar('APPLICATIONINSIGHTS_CONNECTION_STRING'),
    nextAuthUrl: envVar('NEXTAUTH_URL'),
    githubId: envVar('GITHUB_ID'),
    status: 'ok',
  };

  res.status(200).json(healthData);
}
