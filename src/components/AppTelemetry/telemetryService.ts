import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

import packageJson from '../../../package.json';
import { appConfigService } from '../../hooks/appConfigService';

const createTelemetryService = () => {
  const connectionString = appConfigService.APPLICATIONINSIGHTS_CONNECTION_STRING;

  if (!connectionString) return null;

  const reactPlugin = new ReactPlugin();
  const appInsights = new ApplicationInsights({
    config: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
      extensions: [reactPlugin],
      maxBatchInterval: 5000,
      disableFetchTracking: false,
    },
  });

  appInsights.loadAppInsights();

  appInsights.addTelemetryInitializer(function (envelope) {
    if (envelope.tags) {
      envelope.tags['ai.cloud.role'] = packageJson.name;
    }
  });

  return { reactPlugin };
};

// eslint-disable-next-line import/prefer-default-export
export const appInsights = createTelemetryService();
