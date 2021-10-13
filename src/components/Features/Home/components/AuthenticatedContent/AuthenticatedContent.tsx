import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

export default function AuthenticatedContent() {
  return (
    <>
      <UnauthenticatedTemplate>
        <>Login to see secret things</>
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <>Secret thing 2.0</>
      </AuthenticatedTemplate>
    </>
  );
}
