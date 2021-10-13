import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Button, ButtonGroup } from '@material-ui/core';
import Link from 'next/link';

export default function AuthenticatedContent() {
  return (
    <>
      <UnauthenticatedTemplate>
        <>Login to see secret things</>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ButtonGroup orientation="vertical">
          <Link href="/profile" passHref>
            <Button variant="contained" color="secondary">
              Request Profile Information
            </Button>
          </Link>
        </ButtonGroup>
      </AuthenticatedTemplate>
    </>
  );
}
