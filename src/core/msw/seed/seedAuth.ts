export default {
  providers: {
    ok: true,
    gitub: {
      id: 'github',
      name: 'Github Mock',
      type: 'oauth',
      signinUrl: 'path/to/signin',
      callbackUrl: 'path/to/callback',
    },
  },
  session: {
    ok: true,
    user: {
      image: null,
      name: 'Mocked User',
      email: 'mocked-user@email.com',
    },
    expires: 8675309,
  },
};
