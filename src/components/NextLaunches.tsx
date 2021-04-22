import { useQuery, gql } from '@apollo/client';

const LAUNCHES = gql`
  query GetLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;
type Launch = {
  launch_date_utc: string;
  details: string;
  links: { video_link: string };
  launch_success: boolean;
  rocket: { rocket_name: string };
};

const NextLaunches = (): JSX.Element => {
  const { loading, error, data } = useQuery(LAUNCHES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  console.log(data);
  return (
    <div>
      {data.launches.map((launche: Launch) => {
        return (
          <div>
            <p>Date: {launche.launch_date_utc}</p>
            <p>Video: {launche.links.video_link}</p>
            <p> details: {launche.details}</p>
            <p>Rocket: {launche.rocket.rocket_name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NextLaunches;
