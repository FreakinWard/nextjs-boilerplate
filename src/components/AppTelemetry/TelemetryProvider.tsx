import { withAITracking } from '@microsoft/applicationinsights-react-js';
import getConfig from 'next/config';
import { Component, ReactNode } from 'react';

import { ai } from './telemetryService';

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */

interface ClientAppConfig {
  userId: string;
  applicationInsightsInstrumentationKey: string;
}

declare global {
  interface Window {
    clientAppConfig: ClientAppConfig;
  }
}

interface Props {
  children?: ReactNode;
}

type State = {
  initialized: boolean;
};

class TelemetryProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      initialized: false,
    };
  }

  componentDidMount() {
    const { initialized } = this.state;
    // const appInsightsKey: string = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const appInsightsKey = publicRuntimeConfig.appInsightsKey;

    console.log({ publicRuntimeConfig });

    console.log({ serverRuntimeConfig });

    if (!initialized && Boolean(appInsightsKey)) {
      ai.initialize(appInsightsKey);
      this.setState({ initialized: true });
    }
  }

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default withAITracking(ai.reactPlugin, TelemetryProvider);
