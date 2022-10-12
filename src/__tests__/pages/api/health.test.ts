import { testApiHandler } from 'next-test-api-route-handler';

import health, { HealthTypes } from '../../../pages/api/health';

describe('/api/health', () => {
  it('should render expected health data', async () => {
    // arrange
    const handler = health;
    const expected = {
      name: process.env.appName,
      version: process.env.appVersion,
      buildNumber: 'not-set',
      status: 'ok',
    };

    await testApiHandler<HealthTypes>({
      handler,
      test: async ({ fetch }) => {
        // act
        const res = await fetch({ method: 'POST', body: 'data' });
        const result = await res.json();

        // assert
        expect(result).toEqual(expected);
      },
    });
  });
});
