export const seedUserUpdateError = {
  clientUrl: '/api/users/error',
  serverUrl: '*/api/users/error',
  requestData: {
    name: 'Will Fail',
    email: 'fail@example.com',
  },
  expectedError: {
    status: 500,
    statusText: 'Server Error',
    message: 'Mocked Server Error',
  },
};

const seedUserUpdate = {
  clientUrl: '/api/users/1',
  serverUrl: '*/api/users/1',
  requestData: {
    name: 'Updated User Name',
    email: 'updated@example.com',
  },
  responseData: {
    id: 1,
    name: 'Updated User Name',
    email: 'updated@example.com',
    updatedAt: '2023-01-15T12:00:00Z',
  },
};

export default seedUserUpdate;
