import useLaunches from '../../../../hooks/SpaceX/useLaunches';

interface Props {
  title: string;
}

const LaunchRecord = ({ launch }: { launch: Launch }) => (
  <div>
    <a href={`${launch.links.video_link}`}>{launch.mission_name}</a>
  </div>
);

export default function Launches({ title }: Props) {
  const { data: launches } = useLaunches();

  return (
    <div>
      <h2>{title}</h2>
      {launches?.map((launch: Launch) => <LaunchRecord key={launch.id} launch={launch} />)}
      <hr />
      <div>{`Length: ${launches?.length}`}</div>
    </div>
  );
}
