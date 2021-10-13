import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import { Button, ButtonGroup } from '@material-ui/core';

export default function AuthenticatedContent() {
  return (
    <>
      <UnauthenticatedTemplate>
        <>Login to see secret things</>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ButtonGroup orientation="vertical">
          <Button href="/profile" variant="contained" color="secondary">
            Request Profile Information
          </Button>
        </ButtonGroup>
      </AuthenticatedTemplate>
    </>
  );
}
