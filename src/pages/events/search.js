import React from "react";
import qs from "qs";
import Layout from "components/Layout";
import EventItem from "components/EventItem";
import { useRouter } from "next/router";
import { API_URL } from "config";
function SearchPage({ events }) {
  const router = useRouter();
  // console.log(router.query);
  return (
    <Layout>
      <h1>Search Results for {router.query.term}</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem event={event} key={event.slug} />
      ))}
    </Layout>
  );
}
export const getServerSideProps = async (ctx) => {
  const { term } = ctx.query;
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });
  const response = await fetch(`${API_URL}/events?=${query}`);
  const data = await response.json();

  return {
    props: {
      events: data,
    },
  };
};
export default SearchPage;
