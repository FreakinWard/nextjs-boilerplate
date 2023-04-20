import { NextResponse } from 'next/server';

export interface HealthTypes {
  name: string;
  version: string;
  buildNumber: string;
  appInsightsConnectionString: string;
  nextAuthUrl: string;
  githubId: string;
  status: string;
}

export async function GET() {
  const healthData = {
    name: process.env.appName,
    version: process.env.appVersion,
    buildNumber: process.env.ciBuildNumber ?? 'not-set',
    appInsightsConnectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    githubId: process.env.GITHUB_ID,
    status: 'ok',
  };

  return NextResponse.json(healthData);
}
