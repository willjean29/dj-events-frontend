import React from "react";
import Layout from "components/Layout";
import EventItem from "components/EventItem";
import Link from "next/link";
import { API_URL, PER_PAGE } from "config";
import Pagination from "components/Pagination";

function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>My Events</h1>
      {events.map((event) => (
        <EventItem event={event} key={event.slug} />
      ))}
      <Pagination total={total} page={page} />
    </Layout>
  );
}
export const getServerSideProps = async (ctx) => {
  const { page = 1 } = ctx.query;

  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
  // fetch count events
  const respTotalEvents = await fetch(`${API_URL}/events/count`);
  const total = await respTotalEvents.json();

  // fetch events
  const respEvents = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await respEvents.json();
  return {
    props: {
      events,
      page,
      total,
    },
  };
};
export default EventsPage;
