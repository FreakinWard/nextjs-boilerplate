// eslint-disable-next-line @typescript-eslint/no-var-requires
const azureIdentity = require('@azure/identity');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const appConfig = require('@azure/app-configuration');

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const appConfig = { foo: 'bar' };

  // const endpoint = 'https://nextjs-app-configuration.azconfig.io';
  // const credential = new azureIdentity.DefaultAzureCredential();
  // const client = new appConfig.AppConfigurationClient(endpoint, credential);

  let value = null;
  try {
    const connectionString =
      'Endpoint=https://nextjs-app-configuration.azconfig.io;Id=+dYc-l6-s0:tz1EJzjKbE0iBPyFP3Rs;Secret=2p8EEiyvMfPhfff1sMH+WzSjZD2bPgjY1Vwotu2XPKg=';
    const client = new appConfig.AppConfigurationClient(connectionString);

    const setting = await client.getConfigurationSetting({ key: 'APPINSIGHTS_INSTRUMENTATIONKEY' });

    value = { key: setting.key, value: setting.value };
  } catch (e) {
    console.log({ e });
    value = e.message;
  }

  res.status(200).json(value);
};
