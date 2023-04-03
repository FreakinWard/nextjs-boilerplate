// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L113-L121
import hkdf from '@panva/hkdf';
import { EncryptJWT } from 'jose';

import seedAuth from '../../src/core/msw/seed/seedAuth';

async function getDerivedEncryptionKey(secret) {
  return await hkdf('sha256', secret, '', 'NextAuth.js Generated Encryption Key', 32);
}

// Function logic derived from https://github.com/nextauthjs/next-auth/blob/5c1826a8d1f8d8c2d26959d12375704b0a693bfc/packages/next-auth/src/jwt/index.ts#L16-L25
async function encode(token, secret) {
  const maxAge = 30 * 24 * 60 * 60; // 30 days
  const encryptionSecret = await getDerivedEncryptionKey(secret);

  return await new EncryptJWT(token)
    .setProtectedHeader({
      alg: 'dir',
      enc: 'A256GCM',
    })
    .setIssuedAt()
    .setExpirationTime(Date.now() / 1000 + maxAge)
    .setJti('test')
    .encrypt(encryptionSecret);
}

export default function signIn() {
  const mswMock = Cypress.env('NEXT_PUBLIC_API_MOCKING');

  if (mswMock === 'enabled') {
    cy.intercept('GET', '**/api/auth/csrf', seedAuth.csrfToken);
    cy.intercept('GET', '**/api/auth/session', seedAuth.session);

    cy.log(`SignIn (mocked) - ${seedAuth.session.user.email}`);

    return;
  }

  const username = Cypress.env('USER_NAME');
  const password = Cypress.env('USER_PASSWORD');
  const clientId = Cypress.env('CLIENT_ID');

  const scopeOptions = [`openid`, clientId, 'offline_access'];
  const scope = scopeOptions.map(option => option).join(' ');

  const environmentVariablesExist = () => {
    const expectedEnvironmentVariables = [
      'USER_NAME',
      'USER_PASSWORD',
      'NEXTAUTH_SECRET',
      'CLIENT_ID',
      'AUTH_TOKEN_URL',
      'CI_BUILD_NUMBER',
    ];

    expectedEnvironmentVariables.forEach(variableName => {
      expect(Cypress.env(variableName), variableName).not.to.be.undefined;
    });
  };

  const signInUser = () => {
    const authTokenUrl = Cypress.env('AUTH_TOKEN_URL');
    const url = `${authTokenUrl}?username=${username}&password=${password}&grant_type=password&scope=${scope}&client_id=${clientId}&response_type=id_token token`;

    return cy.request({
      method: 'POST',
      url,
    });
  };

  const createNextAuthJwt = ({ body }) => {
    const session = {
      user: { email: username },
      account: {
        id_token: body.id_token,
        refresh_token: body.refresh_token,
      },
    };

    return encode(session, Cypress.env('NEXTAUTH_SECRET')).then(encryptedToken => ({
      encryptedToken,
      session,
    }));
  };

  const setNextAuthSessionCookie = ({ encryptedToken, session }) => {
    cy.intercept('/api/auth/session', { body: session }).as('session');

    const cookieConfig = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      log: false,
    };

    const baseUrl = Cypress.config('baseUrl');
    const hasHttps = baseUrl.includes('https');
    const baseCookieName = 'next-auth.session-token';
    const cookieName = hasHttps ? `__Secure-${baseCookieName}` : baseCookieName;

    cy.setCookie(cookieName, encryptedToken, cookieConfig);
    Cypress.Cookies.preserveOnce(cookieName);
  };

  cy.wrap(`SignIn (real) - ${username}`)
    .then(environmentVariablesExist)
    .then(signInUser)
    .then(createNextAuthJwt)
    .then(setNextAuthSessionCookie);
}
