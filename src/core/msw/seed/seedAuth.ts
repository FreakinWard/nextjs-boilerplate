import { randomBytes } from 'crypto';

export default {
  csrfToken: {
    ok: true,
    csrfToken: randomBytes(32).toString('hex'),
  },
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
  signInResponse: {
    ok: true,
    status: 200,
    url: process.env.WELL_KNOWN,
  },
  signOutResponse: {
    ok: true,
    status: 200,
    url: 'https://path/to/signout/url',
  },
};
