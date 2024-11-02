import { MockedRequest } from 'msw';

import { LogType, logUnhandledRestRequest } from './logUtility';

export const onUnhandledRequest = (request: MockedRequest) => {
  const errorOnUnMockedRequests = true;
  const logType: LogType = errorOnUnMockedRequests ? 'error' : 'warn';

  if (request.method === 'GET') logUnhandledRestRequest(request, logType);

  // TODO: add support for graphql
  // const { body } = request;
  // const parsedBody = parse(body.query);
  // if (parsedBody) logUnhandledGraphQLRequest(parsedBody, logType);

  return logType;
};

export const failTestOnUnhandledRequest = () => {
  let isConsoleWarningOrError = false;
  let unhandledRequestMessage = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkForUnhandledMswRequests = (args: any[]) => {
    const errorMessage = args[0];
    const consoleErrorContainsUnhandledMswRequest = /^Forget an msw mock/.test(errorMessage);

    if (consoleErrorContainsUnhandledMswRequest && !isConsoleWarningOrError) {
      isConsoleWarningOrError = true;

      unhandledRequestMessage = errorMessage;
    }
  };

  beforeEach(() => {
    const originalError = global.console.error;

    jest.spyOn(global.console, 'error').mockImplementation((...args) => {
      checkForUnhandledMswRequests(args);

      // TODO: determine a way to fail the test without mocking console.error
      // When an unhandled request is detected, the stack trace will point to this line.
      // Instead, it would be more helpful if the stack trace to point back to the failing test.
      originalError(...args);
    });
  });

  afterEach(() => {
    if (isConsoleWarningOrError) {
      throw new Error(unhandledRequestMessage);
    }
  });
};
