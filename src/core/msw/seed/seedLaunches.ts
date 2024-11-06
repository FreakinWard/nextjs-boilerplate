import { adapter } from '../../../hooks/SpaceX/useLaunches';
import { SeedGraphQL } from '../types';

const graphQLResponse: LaunchQuery = {
  launches: [
    {
      id: '5eb87cd9ffd86e000604b32a',
      is_tentative: null,
      upcoming: false,
      mission_name: 'Mock Mission 1',
      links: {
        article_link:
          'https://www.space.com/2196-spacex-inaugural-falcon-1-rocket-lost-launch.html',
        video_link: 'https://www.youtube.com/watch?v=0a_00nJ_Y88',
        flickr_images: [],
        mission_patch: null,
      },
      launch_date_utc: '2006-03-24T22:30:00.000Z',
      details: 'Engine failure at 33 seconds and loss of vehicle',
    },
    {
      id: '5eb87cdaffd86e000604b32b',
      is_tentative: null,
      upcoming: false,
      mission_name: 'Mock Mission 2',
      links: {
        article_link: 'https://www.space.com/3590-spacex-falcon-1-rocket-fails-reach-orbit.html',
        video_link: 'https://www.youtube.com/watch?v=Lk4zQ2wP-Nc',
        flickr_images: [],
        mission_patch: null,
      },
      launch_date_utc: '2007-03-21T01:10:00.000Z',
      details:
        'Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage',
    },
  ],
};

const seedLaunches: SeedGraphQL<LaunchQuery, Launch[]> = {
  queryName: 'launches',
  graphQLResponse,
  data: adapter(graphQLResponse),
};

export default seedLaunches;
