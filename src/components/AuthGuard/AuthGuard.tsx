import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
  requireAuth: boolean;
}

export default function AuthGuard({ children, requireAuth }: Props) {
  const { status, data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!requireAuth) return;

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
  }, [requireAuth, router, status, session?.error, session]);

  if (!requireAuth || status === 'authenticated') {
    return <>{children}</>;
  }

  return null;
}
