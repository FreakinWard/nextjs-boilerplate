import { DocumentNode, OperationDefinitionNode } from 'graphql/index';
import { MockedRequest } from 'msw';

export type LogType = 'error' | 'warn';

const logMessage = (message: string, logType: LogType) => {
  // eslint-disable-next-line no-console
  console[logType](message);
};

export const logUnhandledGraphQLRequest = (parsedBody: DocumentNode, logType: LogType) => {
  const firstDefinition = parsedBody.definitions[0] as OperationDefinitionNode;

  const queryName = firstDefinition.name.value;
  const operation = firstDefinition.operation;

  const message = `Forget an msw mock? Unhandled graphql ${operation} named: ${queryName}`;

  logMessage(message, logType);

  return message;
};

export const logUnhandledRestRequest = (request: MockedRequest, logType: LogType) => {
  const method = request.method;

  const message = `Forget an msw mock? Unhandled REST request - ${method}: ${request.url}`;

  logMessage(message, logType);

  return message;
};
