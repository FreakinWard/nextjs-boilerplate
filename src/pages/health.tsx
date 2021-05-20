import useHealth from '../hooks/useHealth';

export default function Health() {
  const { data: health } = useHealth();

  return (
    <>
      <h1>Health</h1>
      <div>
        <span>Status: </span>
        <span>{health?.status}</span>
      </div>
      <div>
        <span>Version: </span>
        <span>{health?.version}</span>
      </div>
    </>
  );
}
