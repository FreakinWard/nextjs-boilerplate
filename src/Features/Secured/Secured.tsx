import InformationBlock from './components/InformationBlock';
import UserName from './components/UserName';

export default function Secured() {
  return (
    <>
      <h1>
        <UserName />
      </h1>
      <InformationBlock
        url="https://next-auth.js.org/getting-started/introduction"
        title="Authentication"
        description="Authentication is enabled using next-auth."
      />
    </>
  );
}
