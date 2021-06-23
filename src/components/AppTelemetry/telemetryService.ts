import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

let reactPlugin: ReactPlugin;
let appInsights: ApplicationInsights;

const createTelemetryService = () => {
  const initialize = (connectionString: string) => {
    if (!connectionString) {
      throw new Error('Instrumentation key not provided');
    }

    reactPlugin = new ReactPlugin();

    appInsights = new ApplicationInsights({
      config: {
        connectionString,
        maxBatchInterval: 0,
        disableFetchTracking: false,
        extensions: [reactPlugin],
      },
    });

    appInsights.loadAppInsights();
  };

  return { reactPlugin, appInsights, initialize };
};

export const ai = createTelemetryService();
export const getAppInsights = () => appInsights;
