interface LaunchQuery {
  launches: Launch[];
}

interface Launch {
  id: string;
  is_tentative: string | null;
  upcoming: boolean;
  mission_name: string;
  links: {
    article_link: string;
    video_link: string;
    flickr_images: string[];
    mission_patch: string | null;
  };
  launch_date_utc: string;
  details: string;
}
