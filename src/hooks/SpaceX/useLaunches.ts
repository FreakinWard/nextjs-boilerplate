import { gql } from 'graphql-request';

import useGraphQl from '../useGraphqql';

const graphQuery = gql`
  query getLaunches($limit: Int, $offset: Int) {
    launches(limit: $limit, offset: $offset) {
      id
      is_tentative
      upcoming
      mission_name
      links {
        article_link
        video_link
        flickr_images
        mission_patch
      }
      launch_date_utc
      details
    }
  }
`;

export default function useLaunches() {
  const limit = 2;
  const offset = 0;

  return useGraphQl({
    queryKey: ['launches'],
    graphQuery,
    variables: {
      limit,
      offset,
    },
  });
}
