/* istanbul ignore file */

'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { status, data: session } = useSession();

  useEffect(() => {
    const isUnauthenticated = status === 'unauthenticated';
    const hasError = session?.error;

    if (isUnauthenticated) {
      void signIn();

      return;
    }

    if (hasError) {
      void signOut();

      return;
    }
  }, [status, session?.error, session]);

  if (status === 'authenticated' && !session?.error) {
    return <>{children}</>;
  }

  return null;
}
