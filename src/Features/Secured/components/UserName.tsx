'use client';

import { useSession } from 'next-auth/react';

export default function UserName() {
  const { data: session } = useSession();

  return (
    <>
      Welcome, <mark>{session?.user.name}</mark>
    </>
  );
}
