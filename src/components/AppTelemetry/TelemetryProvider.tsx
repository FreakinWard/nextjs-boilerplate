import { AppInsightsContext, useAppInsightsContext } from '@microsoft/applicationinsights-react-js';
import { NextComponentType } from 'next';
import { NextRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

import { appInsights } from './telemetryService';

interface Props {
  children?: ReactNode;
  component: NextComponentType;
  router: NextRouter;
}

function TelemetryProvider({ children, component, router: { query, route, pathname } }: Props) {
  const { reactPlugin } = appInsights;

  useEffect(() => {
    const renamedQueryKeys = Object.keys(query).reduce(
      (acc, key) => (acc[`query.${key}`] = query[key]),
      {}
    );

    const properties = {
      router: route,
      ...renamedQueryKeys,
    };

    reactPlugin.trackPageView({
      uri: pathname,
      properties,
    });
  }, [component.displayName, reactPlugin, pathname, query, route]);

  return <AppInsightsContext.Provider value={reactPlugin}>{children}</AppInsightsContext.Provider>;
}

function useTelemetry() {
  if (AppInsightsContext === undefined) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }

  return useAppInsightsContext();
}

export { TelemetryProvider, useTelemetry };
