import { useIsAuthenticated, useMsal, useMsalBrowser } from '../../context/AuthProvider';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default function SignInSignOutButton() {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { InteractionStatus } = useMsalBrowser();

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
