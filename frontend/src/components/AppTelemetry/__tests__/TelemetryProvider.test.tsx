import * as appInsightsReactJs from '@microsoft/applicationinsights-react-js';
import * as appInsightsWeb from '@microsoft/applicationinsights-web';
import { renderHook } from '@testing-library/react';
import Router from 'next/router';
import * as nextAuth from 'next-auth/react';

import { TelemetryProvider, useTelemetry } from '../TelemetryProvider';

jest.mock('next/router', () => ({
  query: { queryKey: 'mockValue' },
}));
jest.mock('@microsoft/applicationinsights-react-js');
jest.mock('@microsoft/applicationinsights-web');

describe('TelemetryProvider', () => {
  const componentMock = { title: 'titleValue' };

  const wrapper = ({ children }: { children: JSX.Element }) => (
    <TelemetryProvider router={Router} pageTitle={componentMock.title}>
      {children}
    </TelemetryProvider>
  );

  const useSessionMock = {
    ...jest.requireActual('next-auth/react'),
    status: 'authenticated',
    data: { user: { name: 'userNameValue' } },
  };

  beforeEach(() => {
    jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);
  });

  it('should not setup appInsights given connectionString is undefined', () => {
    // arrange
    delete process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

    const envelopeMock = 'envelopeMockValue';
    const appInsightsWebMock = {
      ...jest.requireActual('@microsoft/applicationinsights-web'),
      addTelemetryInitializer: jest.fn().mockReturnValue(envelopeMock),
      loadAppInsights: jest.fn(),
    };
    jest.spyOn(appInsightsWeb, 'ApplicationInsights').mockImplementation(() => appInsightsWebMock);

    // act
    renderHook(() => useTelemetry(), { wrapper });

    // assert
    expect(appInsightsWebMock.loadAppInsights).not.toHaveBeenCalled();
  });

  describe('appInsights configuration', () => {
    const theories = [
      { tags: null, description: 'is null' },
      { tags: [{ foo: 'bar' }], description: 'is populated' },
    ];

    it.each(theories)(
      'should setup appInsights as expected given connectionString exists and tags $description',
      tags => {
        // arrange
        const connectionString = 'connectionStringValue';
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING = connectionString;

        const addTelemetryInitializerMock = envelopeCallback => envelopeCallback({ tags: tags });

        const appInsightsWebMock = {
          ...jest.requireActual('@microsoft/applicationinsights-web'),
          addTelemetryInitializer: jest.fn().mockImplementation(addTelemetryInitializerMock),
          loadAppInsights: jest.fn(),
          setAuthenticatedUserContext: jest.fn(),
        };
        jest
          .spyOn(appInsightsWeb, 'ApplicationInsights')
          .mockImplementation(() => appInsightsWebMock);

        const reactPluginMock = {
          ...jest.requireActual('@microsoft/applicationinsights-web'),
          trackPageView: jest.fn(),
        };
        jest.spyOn(appInsightsReactJs, 'ReactPlugin').mockImplementation(() => reactPluginMock);

        const expectedApplicationInsightsConfig = {
          config: {
            connectionString,
            extensions: expect.anything(),
            maxBatchInterval: 5000,
            disableFetchTracking: false,
          },
        };

        // act
        renderHook(() => useTelemetry(), { wrapper });

        // assert
        expect(appInsightsReactJs.ReactPlugin).toHaveBeenCalledWith();
        expect(appInsightsWeb.ApplicationInsights).toHaveBeenCalled();
        expect(appInsightsWeb.ApplicationInsights).toHaveBeenCalledWith(
          expect.objectContaining(expectedApplicationInsightsConfig)
        );
        expect(appInsightsWebMock.loadAppInsights).toHaveBeenCalledWith();
        expect(appInsightsWebMock.addTelemetryInitializer).toHaveBeenCalled();
      }
    );
  });
});
