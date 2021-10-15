import { msalBrowser, useAuth } from '../../context/AuthProvider/AuthProvider';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default function SignInSignOutButton() {
  const { isAuthenticated, inProgress } = useAuth();
  const { InteractionStatus } = msalBrowser;

  if (isAuthenticated) {
    return <SignOutButton />;
  } else if (
    inProgress !== InteractionStatus.Startup &&
    inProgress !== InteractionStatus.HandleRedirect
  ) {
    // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
    return <SignInButton />;
  } else {
    return null;
  }
}
