/* istanbul ignore file */

'use client';

import { useSession } from 'next-auth/react';

export default function UserName() {
  const { data: session } = useSession();
  // const session = { user: { name: 'mockName' } };
  return <mark>{session?.user.name}</mark>;
}
