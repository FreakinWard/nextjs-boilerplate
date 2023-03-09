import {
  AppInsightsContext,
  ReactPlugin,
  useAppInsightsContext,
} from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { NextRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useMemo } from 'react';

interface Props {
  children?: ReactNode;
  pageTitle: string;
  router: NextRouter;
}

const TelemetryContext = createContext(undefined);

function TelemetryProvider({ children, router: { query, route, pathname }, pageTitle }: Props) {
  const appInsights = useMemo(function createTelemetryService() {
    const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

    if (!connectionString) return null;

    const reactPlugin = new ReactPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        connectionString,
        extensions: [reactPlugin],
        maxBatchInterval: 5000,
        disableFetchTracking: false,
      },
    });

    appInsights.loadAppInsights();

    appInsights.addTelemetryInitializer(function (envelope) {
      if (envelope.tags) {
        envelope.tags['ai.cloud.role'] = process.env.appName;
        envelope.tags['ai.application.ver'] = process.env.ciBuildNumber;
      }
    });

    return reactPlugin;
  }, []);

  useEffect(() => {
    if (!appInsights) return;

    const renamedQueryKeys = Object.keys(query).reduce(
      (acc, key) => (acc[`query.${key}`] = query[key]),
      {}
    );

    const properties = {
      route,
      ...renamedQueryKeys,
    };

    appInsights.trackPageView({
      name: pageTitle,
      uri: pathname,
      properties,
    });
  }, [appInsights, pathname, query, route, pageTitle]);

  return <AppInsightsContext.Provider value={appInsights}>{children}</AppInsightsContext.Provider>;
}

function useTelemetry() {
  /* istanbul ignore next */
  if (TelemetryContext === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }

  return useAppInsightsContext();
}

export { TelemetryProvider, useTelemetry };
