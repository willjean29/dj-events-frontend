import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Link from "next/link";
import styles from "styles/Form.module.css";
import { toast } from "react-toastify";
import { API_URL } from "config";
import { useRouter } from "next/router";
import { parseCookies } from "helpers";
function AddEventPage({ token }) {
  const [data, setdata] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const handleEmptyFields = Object.values(data).some((value) => value === "");
    console.log(handleEmptyFields);
    if (handleEmptyFields) {
      toast.error("Please fill in all fields");
      return;
    }
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      if (response.status == 403 || response.status == 401) {
        toast.error("Token Invalid");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const event = await response.json();
      router.push(`/events/${event.slug}`);
    }
  };
  return (
    <Layout>
      <Link href="/events">Go Back</Link>

      <h1>Add Event</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={data.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={data.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={data.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={data.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={data.description}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  return {
    props: {
      token,
    },
  };
}

export default AddEventPage;
