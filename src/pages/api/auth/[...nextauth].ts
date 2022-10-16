/* istanbul ignore file */ // TODO: determine a way to test

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import { createUserIfNotExists } from '../../../core/database/dbUser';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const { name, email } = user;

      const newUser = {
        name,
        email,
        avatarUrl: profile.avatar_url,
      };
      const dbUser = await createUserIfNotExists(newUser);

      return Boolean(dbUser);
    },
  },
});
