import Layout from "components/Layout";
import axios from "axios";
import { parseCookies } from "helpers";
import { API_URL } from "config";
import { useRouter } from "next/router";
import styles from "styles/Dashboard.module.css";
import DashboardEvent from "components/DashboardEvent";
import { toast } from "react-toastify";
import { useEffect } from "react";
function DashboardPage({ events, token }) {
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
  }, []);
  const handleDelete = async (id) => {
    console.log("delete");
    if (confirm("Are you sure you want to delete?")) {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      if (response.ok) {
        // toast.success("Post SuccessFully Removed");
        router.push("/events");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  try {
    const res = await axios.get(`${API_URL}/events/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return {
      props: {
        events: res.data,
        token,
      },
    };
  } catch (error) {
    return {
      props: {
        events: [],
        token: "",
      },
    };
  }
}

export default DashboardPage;
