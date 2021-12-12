import Layout from "components/Layout";
import EventItem from "components/EventItem";
import Link from "next/link";
import { API_URL } from "config";
function HomePage({ events }) {
  // console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem event={event} key={event.slug} />
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  );
}

export const getStaticProps = async (ctx) => {
  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const data = await response.json();
  return {
    props: {
      events: data,
    },
  };
};
export default HomePage;
