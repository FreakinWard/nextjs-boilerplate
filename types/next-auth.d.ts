// noinspection ES6UnusedImports
import { User } from 'next-auth';

declare module 'next-auth/jwt' {
  // Returned by the `jwt` callback and `getToken`, when using JWT sessions
  interface JWT {
    error: string;
    idToken?: string;
    user: User;
    account: {
      id_token: string;
    };
  }
}

declare module 'next-auth' {
  // Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    error: string;
    idToken: string;
    user: {
      email: string;
      name: string;
    };
    signOutUrl: string;
  }

  // The shape of the user object returned in the OAuth providers' `profile` callback,
  // or the second parameter of the `session` callback, when using a database.
  // interface User {}

  // Usually contains information about the provider being used
  // and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
  // interface Account {}

  // The OAuth profile returned from your provider
  // interface Profile {}
}
