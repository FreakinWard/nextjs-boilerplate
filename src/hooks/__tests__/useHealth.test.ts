import mswSetupJest from '../../core/msw/mswSetupJest';
import seedHealth from '../../core/msw/seed/seedHealth';
import { renderHookQuery } from '../../core/testMethods/hookMethods';
import useHealth from '../useHealth';

describe('useHealth', () => {
  mswSetupJest();

  it('should do return seeded posts', async () => {
    // arrange
    // act
    const { result } = await renderHookQuery(useHealth);

    // assert
    expect(result.current.data).toEqual(seedHealth.data);
  });
});
