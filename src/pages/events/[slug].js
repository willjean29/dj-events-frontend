import Layout from "components/Layout";
import { API_URL } from "config";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import styles from "styles/Event.module.css";
import { toast } from "react-toastify";
import { parseCookies } from "helpers";
function EventPage({ event }) {
  const router = useRouter();
  const handleDelete = async () => {
    console.log("delete");
    if (confirm("Are you sure you want to delete?")) {
      const response = await fetch(`${API_URL}/events/${event.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        // toast.success("Post SuccessFully Removed");
        router.push("/events");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(event.date).toLocaleDateString("en-US")} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.url}
              width={960}
              height={600}
              alt={"Image event description"}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <a
          className={styles.back}
          onClick={() => {
            router.back();
          }}
        >
          {" "}
          {"<"} Go Back
        </a>
      </div>
    </Layout>
  );
}
// export const getServerSideProps = async (ctx) => {
//   const { slug } = ctx.params;
//   const response = await fetch(`${API_URL}/events/${slug}`);
//   const data = await response.json();
//   return {
//     props: {
//       event: data.event,
//     },
//   };
// };
export const getStaticPaths = async () => {
  const response = await fetch(`${API_URL}/events`);
  const data = await response.json();
  const paths = data.map((event) => ({
    params: {
      slug: event.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const response = await fetch(`${API_URL}/events?slug=${slug}`);
  const data = await response.json();
  // console.log(data[0]);
  return {
    props: {
      event: data[0],
    },
  };
};

export default EventPage;
