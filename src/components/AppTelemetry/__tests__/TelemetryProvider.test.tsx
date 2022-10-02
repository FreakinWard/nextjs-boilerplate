import * as appInsightsReactJs from '@microsoft/applicationinsights-react-js';
import * as appInsightsWeb from '@microsoft/applicationinsights-web';
import { renderHook } from '@testing-library/react-hooks';
import Router from 'next/router';

import { TelemetryProvider, useTelemetry } from '../TelemetryProvider';

jest.mock('next/router', () => ({
  query: { queryKey: 'mockValue' },
}));
jest.mock('@microsoft/applicationinsights-react-js');
jest.mock('@microsoft/applicationinsights-web');

describe('TelemetryProvider', () => {
  const Component = () => <>child-component</>;
  const wrapper = ({ children }: { children: JSX.Element }) => (
    <TelemetryProvider component={Component} router={Router}>
      {children}
    </TelemetryProvider>
  );

  it('should not setup appInsights given connectionString is undefined', () => {
    // arrange
    delete process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

    const envelopeMock = 'envelopeMockValue';
    const appInsightsWebMock = {
      addTelemetryInitializer: jest.fn().mockReturnValue(envelopeMock),
      loadAppInsights: jest.fn(),
    };
    // @ts-ignore
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
          addTelemetryInitializer: jest.fn().mockImplementation(addTelemetryInitializerMock),
          loadAppInsights: jest.fn(),
        };
        // @ts-ignore
        // eslint-disable-next-line prettier/prettier
        jest
          .spyOn(appInsightsWeb, 'ApplicationInsights')
          .mockImplementation(() => appInsightsWebMock);

        const reactPluginMock = 'reactPluginMock';
        // @ts-ignore
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

    it('should setup appInsights as expected given connectionString exists and tags exist', () => {
      // arrange
      const connectionString = 'connectionStringValue';
      process.env.APPLICATIONINSIGHTS_CONNECTION_STRING = connectionString;

      const addTelemetryInitializerMock = envelopeCallback => envelopeCallback({ tags: null });
      const appInsightsWebMock = {
        addTelemetryInitializer: jest.fn().mockImplementation(addTelemetryInitializerMock),
        loadAppInsights: jest.fn(),
      };
      // @ts-ignore
      // eslint-disable-next-line prettier/prettier
      jest
        .spyOn(appInsightsWeb, 'ApplicationInsights')
        .mockImplementation(() => appInsightsWebMock);

      const reactPluginMock = 'reactPluginMock';
      // @ts-ignore
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
    });
  });
});
