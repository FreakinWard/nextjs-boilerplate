import { useSession } from 'next-auth/react';

import InformationBlock from '../Features/Home/components/InformationBlock';

export default function Secured() {
  const { data: session } = useSession();

  return (
    <>
      <h1>
        Welcome, <mark>{session.user.name}</mark>
      </h1>
      <InformationBlock
        url="https://next-auth.js.org/getting-started/introduction"
        title="Authentication"
        description="Authentication is enabled using next-auth."
      />
    </>
  );
}

Secured.title = 'Secured View';
Secured.requireAuth = true;
