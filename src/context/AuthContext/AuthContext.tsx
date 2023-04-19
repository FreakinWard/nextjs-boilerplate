/* istanbul ignore file */

'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import AuthGuard from './AuthGuard';

export default function AuthContext({
  children,
  session,
}: {
  children: ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>{children}</AuthGuard>
    </SessionProvider>
  );
}
